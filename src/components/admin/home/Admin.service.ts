import { ObjectWidget } from "./Admin.model";
import { IoBook, IoPeopleSharp } from 'react-icons/io5'


export const getCantidadProductos = async (id: number) => {
    try {
        const response = await fetch(`/api/productos_por_usuario?id_usuario=${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener cantidad de productos');
        }

        return data.total;
    } catch (error: any) {
        console.error('Error al obtener cantidad de productos:', error.message);
        return 0;
    }
};


export const getCantidadCLientes = async (id: number) => {
    try {
        const response = await fetch(`/api/clientes_por_usuario?id_usuario=${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtenerla cantaidad de clientes');
        }

        return data.total;
    } catch (error: any) {
        console.error('Error al obtener la cantaidad de clientes', error.message);
        return 0;
    }
};

export const getIngresosUltimosMeses = async () => {
    try {
        // const response = await fetch('/api/user/ingresomeses');
        // const data = await response.json();

        // if (!response.ok) {
        //     throw new Error(data.error || 'Error al obtener ingresos mensuales');
        // }

        const data = [{ id: 1, nombre: 'Enero', total: 4000 },
        { id: 2, nombre: 'Febrero', total: 3000 },
        { id: 3, nombre: 'Marzo', total: 5000 },
        { id: 4, nombre: 'Abril', total: 4000 },
        { id: 5, nombre: 'Mayo', total: 6000 },];

        return data;
    } catch (error: any) {
        console.error('Error al obtener ingresos mensuales:', error.message);
        return [];
    }
};

export const fetchWidget = async (id: number) => {
    const [ventas, productos, clientes] = await Promise.all([
        getIngresosUltimosMeses(),
        getCantidadProductos(id),
        getCantidadCLientes(id)
    ]);

    const Widget: ObjectWidget = {
        ventas,
        total: [

            {
                id: 2,
                nombre: "Total de clientes",
                valor: clientes,
                texto: "Total de clientes.",
                icono: IoPeopleSharp
            },
            {
                id: 1,
                nombre: "Total de productos",
                valor: productos,
                texto: "Total de productos registrados.",
                icono: IoBook
            },
        ]
    };

    return Widget;
};