import { productos } from '@prisma/client';
import { ProductoModel } from './Productos.model';


export const fetchData = async () => {
    try {
        const response = await fetch(`/api/productos`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'No registrado');
        }

        return data.productos;
    } catch (error: any) {
        return null;
    }
};

// Retornar por ID
export const fetchId = async (id: number): Promise<ProductoModel | undefined> => {
  try {
    const response = await fetch(`/api/productos/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al obtener el producto");
    }

    const p = data.producto;

    return {
      id: p.id,
      nombre: p.nombre,
      color: p.color ?? '',
      talla: p.talla ?? '',
      tipo: p.tipo ?? '',
      precio_compra: parseFloat(p.precio_compra),
      precio_venta: parseFloat(p.precio_venta),
      stock: p.stock,
      id_usuario: p.id_usuario ?? 0,
    };
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    return undefined;
  }
};

// Crear producto
export const createProducto = async (data: Partial<ProductoModel>) => {
  try {
    const response = await fetch(`/api/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al crear el producto');
    }

    return result.producto;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return null;
  }
};


// Actualizar producto
export const updateProducto = async (id: number, data: Partial<ProductoModel>) => {
  try {
    const response = await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al actualizar el producto');
    }

    return result.producto;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return null;
  }
};
