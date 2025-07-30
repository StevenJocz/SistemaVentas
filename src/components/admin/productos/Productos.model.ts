export interface ProductoModel {
  id: number;
  nombre: string;
  color?: string;
  talla?: string;
  tipo?: string;
  precio_compra: number; 
  precio_venta: number;
  stock: number;
}