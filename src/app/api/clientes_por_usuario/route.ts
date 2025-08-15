import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// GET: Obtener la cantidad de clientes con estado 1 por usuario
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_usuario = searchParams.get("id_usuario");

    if (!id_usuario) {
      return NextResponse.json(
        { result: false, error: "Parametros faltantes" },
        { status: 400 }
      );
    }

    const total = await prisma.clientes.count({
      where: {
        id_usuario: parseInt(id_usuario),
      },
    });

    return NextResponse.json({ total });
  } catch (error) {
    console.error("Error en GET /api/clientes:", error);
    return NextResponse.json(
      { result: false, error: "Error al obtener la cantidad de clientes" },
      { status: 500 }
    );
  }
}
