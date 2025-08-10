import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id_usuario, fecha, ventaDetalles } = body;

    if (!id_usuario || !fecha || !ventaDetalles || ventaDetalles.length === 0) {
      return NextResponse.json(
        { result: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const nuevaVenta = await prisma.ventas.create({
      data: {
        id_usuario,
        fecha,
      },
    });

    const detallesConVenta = ventaDetalles.map((detalle: any) => ({
      ...detalle,
      id_venta: nuevaVenta.id,
    }));

    const ventaDetallesCreada = await prisma.venta_detalle.createMany({
      data: detallesConVenta,
    });

    return NextResponse.json({
      result: true,
      venta: nuevaVenta,
      ventaDetalles: ventaDetallesCreada,
    });
  } catch (error: any) {
    console.error("Error en POST /api/ventas_con_detalle:", error);
    return NextResponse.json(
      {
        result: false,
        error: "Error al crear la venta y los detalles",
      },
      { status: 500 }
    );
  }
}
