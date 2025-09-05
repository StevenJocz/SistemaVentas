import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// GET: Obtener todos los productos con stock y precios desde inventario
export async function GET(req: Request) {
  try {
    const productos = await prisma.productos.findMany({
      include: {
        venta_detalle: {
          orderBy: {
            id_venta: "desc",
          },
        },
      },
    });

    if (!productos || productos.length === 0) {
      return NextResponse.json(
        { result: false, error: "No se encontraron productos" },
        { status: 404 }
      );
    }

    const productosConStock = productos.map((p) => {
      const stockTotal = p.venta_detalle.reduce((acc, item) => {
        return item.id_estado_factura === null
          ? acc + item.cantidad
          : acc - item.cantidad;
      }, 0);

      const ultimoInventario = p.venta_detalle[0];

      return {
        id: p.id,
        nombre: p.nombre,
        color: p.color,
        talla: p.talla,
        tipo: p.tipo,
        precio_compra: ultimoInventario ? ultimoInventario.precio_venta : 0,
        precio_venta: ultimoInventario ? ultimoInventario.precio_venta : 0,
        stock: stockTotal,
      };
    });

    return NextResponse.json({ result: true, productos: productosConStock });
  } catch (error) {
    console.error("Error en GET /api/productos:", error);
    return NextResponse.json(
      { result: false, error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo producto + inventario
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nombre,
      color,
      talla,
      tipo,
      precio_compra,
      precio_venta,
      stock,
      id_usuario,
      estado, // Asegúrate de obtener el valor de 'estado' desde la solicitud
    } = body;

    if (
      !nombre ||
      !precio_compra ||
      !precio_venta ||
      stock === undefined ||
      !id_usuario ||
      estado === undefined // Asegúrate de que 'estado' sea obligatorio
    ) {
      return NextResponse.json(
        { result: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // ✅ Usamos transacción en callback
    const result = await prisma.$transaction(async (tx) => {
      // 1. Crear producto con todos los campos necesarios, incluyendo 'estado'
      const nuevoProducto = await tx.productos.create({
        data: {
          nombre,
          color,
          talla,
          tipo,
          precio_compra,
          precio_venta,
          stock,
          id_usuario,
          estado, // Aquí pasamos el valor de 'estado'
        },
      });

      // 2. Crear venta_detalle (lo que asumo es la relación con el inventario)
      const nuevoInventario = await tx.venta_detalle.create({
        data: {
          id_producto: nuevoProducto.id,
          cantidad: stock,
          precio_venta,
          precio_compra,
          id_estado_factura: null, // Suponiendo que es una entrada nueva, sin estado de factura
        },
      });

      return { nuevoProducto, nuevoInventario };
    });

    return NextResponse.json({
      result: true,
      producto: result.nuevoProducto,
      inventario: result.nuevoInventario,
    });
  } catch (error: any) {
    console.error("Error en POST /api/productos:", error);
    return NextResponse.json(
      {
        result: false,
        error:
          error.code === "P2002"
            ? "El producto ya existe"
            : "Error al crear el producto",
      },
      { status: 500 }
    );
  }
}
