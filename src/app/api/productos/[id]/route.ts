import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/utils/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productoId = parseInt(id);

    if (isNaN(productoId)) {
      return NextResponse.json(
        { result: false, error: "ID inválido" },
        { status: 400 }
      );
    }

    const { rows: productos } = await pool.query(
      `
      SELECT p.*, vd.*
      FROM productos p
      LEFT JOIN venta_detalle vd ON vd.id_producto = p.id
      WHERE p.id = $1
      ORDER BY vd.id DESC
      `,
      [productoId]
    );

    if (!productos || productos.length === 0) {
      return NextResponse.json(
        { result: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const producto = productos[0];

    const ventaDetalle = productos.filter((vd) => vd.id !== null);

    const stockTotal = ventaDetalle.reduce((acc, item) => {
      return item.id_estado_factura === null
        ? acc + item.cantidad
        : acc - item.cantidad;
    }, 0);

    const ultimoInventario = ventaDetalle[0];

    return NextResponse.json({
      result: true,
      producto: {
        id: producto.id,
        nombre: producto.nombre,
        color: producto.color,
        talla: producto.talla,
        tipo: producto.tipo,
        precio_compra: ultimoInventario ? ultimoInventario.precio_compra : null,
        precio_venta: ultimoInventario ? ultimoInventario.precio_venta : null,
        stock: stockTotal,
      },
    });
  } catch (error) {
    console.error("Error en GET /api/productos/[id]:", error);
    return NextResponse.json(
      { result: false, error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const productoId = parseInt(id, 10);
  const body = await req.json();

  if (isNaN(productoId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const { nombre, color, talla, tipo, precio_compra, precio_venta, stock } =
    body;

  try {
    const client = await pool.connect();
    await client.query("BEGIN");

    // Verificar si producto existe
    const { rows: existing } = await client.query(
      `SELECT * FROM productos WHERE id = $1`,
      [productoId]
    );
    if (existing.length === 0) {
      await client.query("ROLLBACK");
      client.release();
      return NextResponse.json(
        { result: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar producto
    const { rows: updatedRows } = await client.query(
      `
      UPDATE productos
      SET nombre=$1, color=$2, talla=$3, tipo=$4
      WHERE id=$5
      RETURNING *
      `,
      [nombre, color, talla, tipo, productoId]
    );
    const productoActualizado = updatedRows[0];

    // Insertar movimiento en inventario
    await client.query(
      `
      INSERT INTO inventario (id_producto, cantidad, tipo, precio_compra, precio_venta)
      VALUES ($1, $2, 'Entrada', $3, $4)
      `,
      [productoId, stock, precio_compra, precio_venta]
    );

    await client.query("COMMIT");
    client.release();

    return NextResponse.json({
      result: true,
      producto: productoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      {
        result: false,
        error: "Error interno",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { result: false, error: "ID inválido" },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    // Verificar existencia
    const { rows: existing } = await client.query(
      `SELECT * FROM productos WHERE id = $1`,
      [id]
    );
    if (existing.length === 0) {
      client.release();
      return NextResponse.json(
        { result: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar producto
    await client.query(`DELETE FROM productos WHERE id = $1`, [id]);
    client.release();

    return NextResponse.json({ result: true, message: "Producto eliminado" });
  } catch (error) {
    console.error("Error en DELETE /api/productos/[id]:", error);
    return NextResponse.json(
      { result: false, error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
