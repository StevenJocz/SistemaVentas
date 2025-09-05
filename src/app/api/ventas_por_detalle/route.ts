import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idUsuario = searchParams.get("id_usuario");

    if (!idUsuario) {
      return NextResponse.json(
        { result: false, error: "id_usuario es requerido" },
        { status: 400 }
      );
    }

    const ventas = await prisma.$queryRaw<
      { id: number; fecha: Date; estado: string }[]
    >`
      SELECT v.id, v.fecha
      FROM ventas v
      WHERE v.id_usuario = ${Number(idUsuario)}
    `;

    if (ventas.length === 0) {
      return NextResponse.json({
        result: false,
        error: "No se encontraron ventas",
      });
    }

    // Para cada venta, obtener sus detalles
    const ventasConDetalles = await Promise.all(
      ventas.map(async (venta) => {
        const detalles = await prisma.$queryRaw<
          {
            id: number;
            producto: string | null;
            cantidad: number;
            cliente: string | null;
            total: number;
            estado_envio: string | null;
            estado_pago: string | null;
            estado_factura: string | null;
          }[]
        >`
          SELECT
            vd.id,
            p.nombre AS producto,
            vd.cantidad,
            c.nombre AS cliente,
            (vd.precio_venta * vd.cantidad) AS total,
            ee.nombre AS estado_envio,
            ed.nombre AS estado_pago,
            ef.nombre AS estado_factura
          FROM venta_detalle vd
          LEFT JOIN productos p ON vd.id_producto = p.id
          LEFT JOIN clientes c ON vd.id_cliente = c.id
          LEFT JOIN estados_envios ee ON vd.id_estado_envio = ee.id
          LEFT JOIN estados_deudas ed ON vd.id_estado_deuda = ed.id
          LEFT JOIN estados_facturas ef ON vd.id_estado_factura = ef.id
          WHERE vd.id_venta = ${venta.id}
        `;

        return {
          id: venta.id,
          fecha: venta.fecha,
          estado: venta.estado,
          total: detalles
            .reduce((acc, d) => acc + Number(d.total), 0)
            .toString(),
          detalles: detalles.map((d) => ({
            id: d.id,
            producto: d.producto,
            cantidad: d.cantidad,
            cliente: d.cliente,
            total: d.total.toString(),
            estadoEnvio: d.estado_envio,
            estadoPago: d.estado_pago,
            estadoFactura: d.estado_factura,
          })),
        };
      })
    );

    return NextResponse.json(ventasConDetalles);
  } catch (error: any) {
    console.error("Error en GET /api/ventas_por_detalle:", error);
    return NextResponse.json(
      {
        result: false,
        error: "Error al obtener las ventas y detalles",
      },
      { status: 500 }
    );
  }
}
