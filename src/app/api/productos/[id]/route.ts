import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// GET: Obtener un producto por ID
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

        const producto = await prisma.productos.findUnique({
            where: { id },
        });

        if (!producto) {
            return NextResponse.json(
                { result: false, error: "Producto no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ result: true, producto });
    } catch (error) {
        console.error("Error en GET /api/productos/[id]:", error);
        return NextResponse.json(
            { result: false, error: "Error al obtener el producto" },
            { status: 500 }
        );
    }
}

// PUT: Actualizar producto existente
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
        color,
        talla,
        tipo,
        precio_compra,
        precio_venta,
        stock,
    } = body;

    try {
        const productoActualizado = await prisma.productos.update({
            where: { id },
            data: {
                nombre,
                color,
                talla,
                tipo,
                precio_compra,
                precio_venta,
                stock,
            },
        });

        return NextResponse.json({ result: true, producto: productoActualizado });
    } catch (error: any) {
        console.error("Error al actualizar producto:", error);
        return NextResponse.json(
            {
                result: false,
                error:
                    error.code === "P2025"
                        ? "Producto no encontrado"
                        : "Error interno",
            },
            { status: 500 }
        );
    }
}

// DELETE: Eliminar un producto por ID
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

        const productoExistente = await prisma.productos.findUnique({
            where: { id },
        });

        if (!productoExistente) {
            return NextResponse.json(
                { result: false, error: "Producto no encontrado" },
                { status: 404 }
            );
        }

        await prisma.productos.delete({
            where: { id },
        });

        return NextResponse.json({ result: true, message: "Producto eliminado" });
    } catch (error) {
        console.error("Error en DELETE /api/productos/[id]:", error);
        return NextResponse.json(
            { result: false, error: "Error al eliminar el producto" },
            { status: 500 }
        );
    }
}
