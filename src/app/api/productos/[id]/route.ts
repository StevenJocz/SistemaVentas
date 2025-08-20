import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

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
            include: {
                inventarios: {
                    orderBy: { createdat: "desc" }, // trae ordenados por fecha descendente
                },
            },
        });

        if (!producto) {
            return NextResponse.json(
                { result: false, error: "Producto no encontrado" },
                { status: 404 }
            );
        }

        // Stock total sumando entradas y salidas
        const stockTotal = producto.inventarios.reduce((acc, item) => {
            return item.tipo === "Entrada"
                ? acc + item.cantidad
                : acc - item.cantidad;
        }, 0);

        // Último inventario (ya viene ordenado desc por fecha)
        const ultimoInventario = producto.inventarios[0];

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

// PUT: Actualizar producto existente + registrar en inventario
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // 👈 params es async
) {
    const { id } = await context.params; // 👈 hay que hacer await
    const productoId = parseInt(id, 10);
    const body = await req.json();

    if (isNaN(productoId)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const {
        nombre,
        color,
        talla,
        tipo,
        precio_compra,
        precio_venta,
        stock,   // ✅ ahora viene de body

    } = body;

    try {
        // 1️⃣ Verificar si existe el producto
        console.log("Verificando producto con ID:", productoId);
        const productoExistente = await prisma.productos.findUnique({
            where: { id: productoId },
        });

        if (!productoExistente) {
            return NextResponse.json(
                { result: false, error: "Producto no encontrado" },
                { status: 404 }
            );
        }

        // 2️⃣ Actualizar solo datos generales del producto
        const productoActualizado = await prisma.productos.update({
            where: { id: productoId },
            data: {
                nombre,
                color,
                talla,
                tipo,
            },
        });

        // 3️⃣ Registrar movimiento en inventario (entrada o salida)
        await prisma.inventario.create({
                data: {
                    id_producto: productoId,
                    cantidad: stock,
                    tipo: "Entrada", // "Entrada" o "Salida"
                    precio_compra,
                    precio_venta,
                },
            });

        return NextResponse.json({
            result: true,
            producto: productoActualizado,
        });
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
