import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// GET: Obtener un cliente por ID
export async function GET(
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

    const cliente = await prisma.clientes.findUnique({
      where: { id },
    });

    if (!cliente) {
      return NextResponse.json(
        { result: false, error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ result: true, cliente });
  } catch (error) {
    console.error("Error en GET /api/clientes/[id]:", error);
    return NextResponse.json(
      { result: false, error: "Error al obtener el cliente" },
      { status: 500 }
    );
  }
}

// PUT: Actualizar cliente existente
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const body = await req.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const {
    nombre,
    tiktok,
    telefono,
    correo,
    estado,
    instagram,
    x,
    youtube,
    facebook,
    id_usuario,
  } = body;

  try {
    const clienteActualizado = await prisma.clientes.update({
      where: { id },
      data: {
        nombre,
        tiktok,
        telefono,
        correo,
        estado,
        instagram,
        x,
        youtube,
        facebook,
        id_usuario,
      },
    });

    return NextResponse.json({ cliente: clienteActualizado });
  } catch (error: any) {
    console.error("Error al actualizar cliente:", error);
    return NextResponse.json(
      {
        error:
          error.code === "P2025"
            ? "Cliente no encontrado"
            : error.code === "P2002"
            ? "TikTok duplicado"
            : "Error interno",
      },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un cliente por ID
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

    const clienteExistente = await prisma.clientes.findUnique({
      where: { id },
    });

    if (!clienteExistente) {
      return NextResponse.json(
        { result: false, error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    await prisma.clientes.delete({
      where: { id },
    });

    return NextResponse.json({ result: true, message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error en DELETE /api/clientes/[id]:", error);
    return NextResponse.json(
      { result: false, error: "Error al eliminar el cliente" },
      { status: 500 }
    );
  }
}
