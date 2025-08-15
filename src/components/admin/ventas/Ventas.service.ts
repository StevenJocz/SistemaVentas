const ventasData: (VentaModel & {
  detalles: DetalleVentaModel[];
})[] =[
  {
    id: 1,
    fecha: "2025-08-10T14:30:00Z",
    total: "150000",
    detalles: [
      { id: 1, producto: "Camisa Azul", cantidad: 2, cliente: "Juan Pérez", total: "50000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 2, producto: "Pantalón Negro", cantidad: 1, cliente: "María López", total: "40000", estadoEnvio: "Pendiente", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 3, producto: "Zapatos Deportivos", cantidad: 1, cliente: "Carlos Ruiz", total: "30000", estadoEnvio: "En preparación", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 4, producto: "Gorra", cantidad: 3, cliente: "Ana Torres", total: "15000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 5, producto: "Cinturón", cantidad: 1, cliente: "Luis Martínez", total: "10000", estadoEnvio: "Pendiente", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 6, producto: "Chaqueta", cantidad: 1, cliente: "Sofía Ramírez", total: "40000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 7, producto: "Medias", cantidad: 5, cliente: "Pedro Sánchez", total: "5000", estadoEnvio: "En preparación", estadoPago: "Pendiente", estadoFactura: "No generada" },
    ]
  },
  {
    id: 2,
    fecha: "2025-08-09T10:15:00Z",
    total: "90000",
    detalles: [
      { id: 1, producto: "Bolso", cantidad: 1, cliente: "Lucía Herrera", total: "30000", estadoEnvio: "En preparación", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 2, producto: "Vestido Rojo", cantidad: 1, cliente: "Diego Torres", total: "45000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 3, producto: "Collar", cantidad: 2, cliente: "Valentina Cruz", total: "15000", estadoEnvio: "Pendiente", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 4, producto: "Zapatos Tacón", cantidad: 1, cliente: "Mateo Gómez", total: "35000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 5, producto: "Sombrero", cantidad: 1, cliente: "Fernanda Ríos", total: "20000", estadoEnvio: "Pendiente", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 6, producto: "Pulsera", cantidad: 1, cliente: "Camilo Vargas", total: "10000", estadoEnvio: "En preparación", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 7, producto: "Blusa Blanca", cantidad: 2, cliente: "Gabriela Paredes", total: "40000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
    ]
  },
  {
    id: 3,
    fecha: "2025-08-08T16:45:00Z",
    total: "120000",
    detalles: [
      { id: 1, producto: "Chaqueta de Cuero", cantidad: 1, cliente: "Tomás Aguilar", total: "80000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 2, producto: "Jeans", cantidad: 2, cliente: "Claudia Díaz", total: "40000", estadoEnvio: "En preparación", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 3, producto: "Camiseta Negra", cantidad: 3, cliente: "Héctor Molina", total: "60000", estadoEnvio: "Pendiente", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 4, producto: "Zapatos de Cuero", cantidad: 1, cliente: "Isabella Ortega", total: "70000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 5, producto: "Corbata", cantidad: 2, cliente: "Mauricio Peña", total: "15000", estadoEnvio: "En preparación", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 6, producto: "Sombrero Fedora", cantidad: 1, cliente: "Patricia Cárdenas", total: "30000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 7, producto: "Reloj", cantidad: 1, cliente: "Andrés Suárez", total: "120000", estadoEnvio: "Pendiente", estadoPago: "Pendiente", estadoFactura: "No generada" },
    ]
  },
  {
    id: 4,
    fecha: "2025-08-07T09:20:00Z",
    total: "50000",
    detalles: [
      { id: 31, producto: "Camiseta Polo", cantidad: 1, cliente: "Daniela Vega", total: "25000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 32, producto: "Jeans Slim", cantidad: 1, cliente: "Oscar Medina", total: "80000", estadoEnvio: "En bodega", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 33, producto: "Chaqueta Denim", cantidad: 1, cliente: "Marisol Herrera", total: "120000", estadoEnvio: "En camino", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 34, producto: "Gorro Lana", cantidad: 2, cliente: "Juan Pablo Torres", total: "20000", estadoEnvio: "Entregado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 35, producto: "Calcetines", cantidad: 5, cliente: "Beatriz López", total: "10000", estadoEnvio: "En preparación", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 36, producto: "Cinturón", cantidad: 1, cliente: "Rodrigo Álvarez", total: "25000", estadoEnvio: "Cancelado", estadoPago: "Reembolsado", estadoFactura: "Anulada" },
      { id: 37, producto: "Bufanda", cantidad: 1, cliente: "Elena Castillo", total: "30000", estadoEnvio: "En camino", estadoPago: "Pagado", estadoFactura: "Generada" }
    ]
  },
  {
    id: 5,
    fecha: "2025-08-06T18:00:00Z",
    total: "200000",
    detalles: [
      { id: 38, producto: "Vestido Floral", cantidad: 1, cliente: "Raúl Fernández", total: "85000", estadoEnvio: "Enviado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 39, producto: "Zapatos Clásicos", cantidad: 1, cliente: "Natalia Vargas", total: "120000", estadoEnvio: "Entregado", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 40, producto: "Bolso Pequeño", cantidad: 1, cliente: "Cristian Moreno", total: "45000", estadoEnvio: "En bodega", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 41, producto: "Sombrero Playero", cantidad: 2, cliente: "Verónica Silva", total: "60000", estadoEnvio: "En camino", estadoPago: "Pagado", estadoFactura: "Generada" },
      { id: 42, producto: "Reloj Smart", cantidad: 1, cliente: "Álvaro Gutiérrez", total: "150000", estadoEnvio: "En preparación", estadoPago: "Pendiente", estadoFactura: "No generada" },
      { id: 43, producto: "Lentes Sol", cantidad: 1, cliente: "Marina Torres", total: "40000", estadoEnvio: "Cancelado", estadoPago: "Reembolsado", estadoFactura: "Anulada" },
      { id: 44, producto: "Pulsera", cantidad: 3, cliente: "Esteban Romero", total: "45000", estadoEnvio: "Entregado", estadoPago: "Pagado", estadoFactura: "Generada" }
    ]
  }
]
;


import { DetalleVentaModel, VentaModel } from "./Ventas.model";

export const fetchData = async (): Promise<VentaModel[]> => {
    try {
        const data: VentaModel[] = [
            {
                id: 1,
                fecha: "2025-08-10T14:30:00Z",
                total: "150000",

            },
            {
                id: 2,
                fecha: "2025-08-09T10:15:00Z",
                total: "90000",

            },
            {
                id: 3,
                fecha: "2025-08-08T16:45:00Z",
                total: "120000",

            },
            {
                id: 4,
                fecha: "2025-08-07T09:20:00Z",
                total: "50000",

            },
            {
                id: 5,
                fecha: "2025-08-06T18:00:00Z",
                total: "200000",
            }
        ];

        return data;
    } catch (error) {
        return []; 
    }
};

export const fetchVentaById = async (id: number) => {
  const venta = ventasData.find(v => v.id === id);
  return venta || null;
};