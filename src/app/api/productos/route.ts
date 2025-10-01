// src/app/api/productos/route.ts

import { NextResponse } from "next/server";
import { pool } from "@/utils/db";

export async function GET(req: Request) {
  try {
    const { rows: productos } = await pool.query(`
      SELECT p.*, json_agg(vd ORDER BY vd.id_venta DESC) AS venta_detalle
      FROM productos p
      LEFT JOIN venta_detalle vd ON vd.id_producto = p.id
      GROUP BY p.id
    `);
    if (!productos || productos.length === 0) {
      return NextResponse.json(
        { result: false, error: "No se encontraron productos" },
        { status: 404 }
      );
    }

    const productosConStock = productos.map((p) => {
      const ventaDetalle = (p.venta_detalle || []).filter(
        (item: any) => item !== null
      );

      const stockTotal = ventaDetalle.reduce((acc: number, item: any) => {
        return item.id_estado_factura === null
          ? acc + item.cantidad
          : acc - item.cantidad;
      }, 0);

      const ultimoInventario = ventaDetalle[0];

      return {
        id: p.id,
        nombre: p.nombre,
        color: p.color,
        talla: p.talla,
        tipo: p.tipo,
        precio_compra: ultimoInventario ? ultimoInventario.precio_compra : 0,
        precio_venta: ultimoInventario ? ultimoInventario.precio_venta : 0,
        stock: stockTotal,
      };
    });

    return NextResponse.json({ result: true, productos: productosConStock });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: false, error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const client = await pool.connect();
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
      estado,
    } = body;

    if (
      !nombre ||
      !precio_compra ||
      !precio_venta ||
      stock === undefined ||
      !id_usuario ||
      estado === undefined
    ) {
      return NextResponse.json(
        { result: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    await client.query("BEGIN");

    const { rows: productoRows } = await client.query(
      `
        INSERT INTO productos (nombre, color, talla, tipo, precio_compra, precio_venta, stock, id_usuario, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `,
      [
        nombre,
        color,
        talla,
        tipo,
        precio_compra,
        precio_venta,
        stock,
        id_usuario,
        estado,
      ]
    );

    const nuevoProducto = productoRows[0];

    const { rows: inventarioRows } = await client.query(
      `
        INSERT INTO venta_detalle (id_producto, cantidad, precio_venta, precio_compra, id_estado_factura)
        VALUES ($1, $2, $3, $4, NULL)
        RETURNING *
      `,
      [nuevoProducto.id, stock, precio_venta, precio_compra]
    );

    const nuevoInventario = inventarioRows[0];

    await client.query("COMMIT");

    return NextResponse.json({
      result: true,
      producto: nuevoProducto,
      inventario: nuevoInventario,
    });
  } catch (error: any) {
    console.log(error);
    await client.query("ROLLBACK");
    return NextResponse.json(
      {
        result: false,
        error:
          error.code === "23505"
            ? "El producto ya existe"
            : "Error al crear el producto",
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
