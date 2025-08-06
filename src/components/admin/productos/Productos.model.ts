export interface ProductoModel {
  id: number;
  nombre: string;
  color: string | null;
  talla: string | null;
  tipo: string | null;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  id_usuario: number | null;
}
