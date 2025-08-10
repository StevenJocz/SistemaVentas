import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// GET: Obtener la cantidad de productos con estado específico por usuario
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_usuario = searchParams.get("id_usuario");
    const estado = searchParams.get("estado") || "1";

    if (!id_usuario) {
      return NextResponse.json(
        { result: false, error: "Parametros faltantes" },
        { status: 400 }
      );
    }

    const cantidadProductos = await prisma.productos.count({
      where: {
        id_usuario: parseInt(id_usuario),
        estado: parseInt(estado),
      },
    });

    if (cantidadProductos === 0) {
      return NextResponse.json(
        { result: false, error: "Productos no encontrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ result: true, cantidadProductos });
  } catch (error) {
    console.error("Error en GET /api/productos:", error);
    return NextResponse.json(
      { result: false, error: "Error al obtener la cantidad de productos" },
      { status: 500 }
    );
  }
}
