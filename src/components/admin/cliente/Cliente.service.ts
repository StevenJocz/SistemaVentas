import { ClientesModel } from "./Cliente.model";

// Simulación de los datos en memoria
const clientes: ClientesModel[] = [
  {
    id: 1,
    nombre: 'Carlos Gómez',
    telefono: '3101234567',
    correo: 'carlos.gomez@example.com',
    estado: true
  },
  {
    id: 2,
    nombre: 'María Fernández',
    telefono: '3119876543',
    correo: 'maria.fernandez@example.com',
    estado: true
  },
  {
    id: 3,
    nombre: 'Luis Martínez',
    telefono: '3124567890',
    correo: 'luis.martinez@example.com',
    estado: false
  },
  {
    id: 4,
    nombre: 'Ana Torres',
    telefono: '3137890123',
    correo: 'ana.torres@example.com',
    estado: true
  },
  {
    id: 5,
    nombre: 'Julián Ríos',
    telefono: '3143214567',
    correo: 'julian.rios@example.com',
    estado: true
  },
  {
    id: 6,
    nombre: 'Paula Morales',
    telefono: '3156547890',
    correo: 'paula.morales@example.com',
    estado: false
  },
  {
    id: 7,
    nombre: 'Santiago Herrera',
    telefono: '3169871234',
    correo: 'santiago.herrera@example.com',
    estado: true
  },
  {
    id: 8,
    nombre: 'Laura Castillo',
    telefono: '3177418529',
    correo: 'laura.castillo@example.com',
    estado: true
  },
  {
    id: 9,
    nombre: 'Diego Ramírez',
    telefono: '3189632587',
    correo: 'diego.ramirez@example.com',
    estado: false
  },
  {
    id: 10,
    nombre: 'Camila Vargas',
    telefono: '3197531597',
    correo: 'camila.vargas@example.com',
    estado: true
  }
];

// Retornar todos
export const fetchData = async (): Promise<ClientesModel[]> => {
  return clientes;
};

// Retornar por ID
export const fetchId = async (id: number): Promise<ClientesModel | undefined> => {
  const cliente = clientes.find((c) => c.id === id);
  return cliente;
};