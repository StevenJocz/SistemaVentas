import { ClientesModel } from "./Cliente.model";


export const fetchData = async () => {
    try {
        const response = await fetch(`/api/clientes?id_usuario=1`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'No registrado');
        }

        return data.clientes;
    } catch (error: any) {
        return null;
    }
};


// Retornar por ID
export const fetchId = async (id: number): Promise<ClientesModel | undefined> => {
  try {
    const response = await fetch(`/api/clientes/${id}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al obtener el cliente");
    }

    return data.cliente;
  } catch (error) {
    console.error("Error al obtener el cliente por ID:", error);
    return undefined;
  }
};

// Crear cliente
export const createCliente = async (data: Partial<ClientesModel>) => {
  try {
    const response = await fetch(`/api/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al crear el cliente');
    }

    return result.cliente;
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    return null;
  }
};

// Actualizar cliente
export const updateCliente = async (id: number, data: Partial<ClientesModel>) => {
  try {
    const response = await fetch(`/api/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al actualizar el cliente');
    }

    return result.cliente;
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    return null;
  }
};
