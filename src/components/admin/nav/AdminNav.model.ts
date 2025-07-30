import {
    IoGridOutline,
    IoConstructOutline,
    IoHomeOutline,
    IoPersonOutline,
    IoBagCheckOutline 
} from 'react-icons/io5';

export const RoutesAdmin: Record<string, Route> = {
    INICIO: {
        path: '/dashboard',
        name: 'Inicio',
        icon: IoHomeOutline
    },
    CLIENTES: {
        path: '/dashboard/cliente',
        name: 'Clientes',
        icon: IoPersonOutline
    },
   
    PRODUCTOS: {
        path: '/dashboard/productos',
        name: 'Productos',
        icon: IoGridOutline 
    },
    CONVENIOS: {
        path: '/dashboard/ventas',
        name: 'Ventas',
        icon: IoBagCheckOutline 
    },
    CONFIGURACION: {
        path: '/dashboard/admin/configuracion',
        name: 'Configuración',
        icon: IoConstructOutline
    }
};

export interface Route {
    path: string;
    name: string;
    icon: React.ElementType;
}

