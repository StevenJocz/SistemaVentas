import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// GET: Obtener todos los productos con stock y precios desde inventario
export async function GET(req: Request) {
  try {
    const productos = await prisma.productos.findMany({
      include: {
        inventarios: {
          orderBy: {
            createdat: "desc", // traer el inventario más reciente primero
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
      // calcular stock
      const stockTotal = p.inventarios.reduce((acc, item) => {
        return item.tipo === "Entrada"
          ? acc + item.cantidad
          : acc - item.cantidad;
      }, 0);

      // tomar el último inventario registrado (si existe)
      const ultimoInventario = p.inventarios[0];

      return {
        id: p.id,
        nombre: p.nombre,
        color: p.color,
        talla: p.talla,
        tipo: p.tipo,
        precio_compra: ultimoInventario
          ? ultimoInventario.precio_compra
          : 0, // 👈 si no tiene inventario => 0
        precio_venta: ultimoInventario
          ? ultimoInventario.precio_venta
          : 0, // 👈 si no tiene inventario => 0
        stock: stockTotal, // si no hay inventario, el reduce da 0
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
    } = body;

    if (
      !nombre ||
      !precio_compra ||
      !precio_venta ||
      stock === undefined ||
      !id_usuario
    ) {
      return NextResponse.json(
        { result: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // ✅ Usamos transacción en callback
    const result = await prisma.$transaction(async (tx) => {
      // 1. Crear producto
      const nuevoProducto = await tx.productos.create({
        data: {
          nombre,
          color,
          talla,
          tipo,
          id_usuario,
        },
      });

      // 2. Crear inventario asociado
      const nuevoInventario = await tx.inventario.create({
        data: {
          id_producto: nuevoProducto.id, 
          cantidad: stock,
          precio_compra,
          precio_venta,
          tipo: "Entrada",
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

