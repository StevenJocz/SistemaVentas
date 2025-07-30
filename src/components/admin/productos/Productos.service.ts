import { ProductoModel } from './Productos.model';

// Simulación de los productos en memoria
const productos: ProductoModel[] = [
  {
    id: 1,
    nombre: 'Camiseta Blanca',
    color: 'Blanco',
    talla: 'M',
    tipo: 'Ropa',
    precio_compra: 15000,
    precio_venta: 25000,
    stock: 50
  },
  {
    id: 2,
    nombre: 'Jeans Azul',
    color: 'Azul',
    talla: '32',
    tipo: 'Ropa',
    precio_compra: 40000,
    precio_venta: 60000,
    stock: 20
  },
  {
    id: 3,
    nombre: 'Zapatos Deportivos',
    color: 'Negro',
    talla: '42',
    tipo: 'Calzado',
    precio_compra: 80000,
    precio_venta: 120000,
    stock: 15
  },
  {
    id: 4,
    nombre: 'Chaqueta Impermeable',
    color: 'Gris',
    talla: 'L',
    tipo: 'Ropa',
    precio_compra: 70000,
    precio_venta: 110000,
    stock: 10
  },
  {
    id: 5,
    nombre: 'Gorra Estampada',
    color: 'Rojo',
    talla: 'Única',
    tipo: 'Accesorio',
    precio_compra: 8000,
    precio_venta: 15000,
    stock: 60
  },
  {
    id: 6,
    nombre: 'Pantaloneta',
    color: 'Verde',
    talla: 'S',
    tipo: 'Ropa',
    precio_compra: 12000,
    precio_venta: 20000,
    stock: 35
  },
  {
    id: 7,
    nombre: 'Sudadera Completa',
    color: 'Negro',
    talla: 'XL',
    tipo: 'Ropa',
    precio_compra: 50000,
    precio_venta: 85000,
    stock: 25
  },
  {
    id: 8,
    nombre: 'Reloj Deportivo',
    color: 'Negro',
    talla: '',
    tipo: 'Accesorio',
    precio_compra: 100000,
    precio_venta: 150000,
    stock: 5
  },
  {
    id: 9,
    nombre: 'Bolso de Tela',
    color: 'Azul',
    talla: '',
    tipo: 'Accesorio',
    precio_compra: 20000,
    precio_venta: 35000,
    stock: 18
  },
  {
    id: 10,
    nombre: 'Camisa Formal',
    color: 'Celeste',
    talla: 'M',
    tipo: 'Ropa',
    precio_compra: 25000,
    precio_venta: 40000,
    stock: 40
  }
];

// Retornar todos
export const fetchData = async (): Promise<ProductoModel[]> => {
  return productos;
};

// Retornar por ID
export const fetchId = async (id: number): Promise<ProductoModel | undefined> => {
  return productos.find((p) => p.id === id);
};
