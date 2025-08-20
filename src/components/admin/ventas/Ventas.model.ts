export interface DetalleVentaModel {
    id: number;
    producto: string;
    cantidad: number;
    cliente: string;
    total: string;
    estadoEnvio: string;
    estadoPago: string;
    estadoFactura: string;
}

export interface VentaModel {
    id: number;
    fecha: string;
    total: string;
    estado: string;
    detalles?: DetalleVentaModel[];
}