CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(255) NOT NULL
);

CREATE TABLE empresas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    rol INTEGER REFERENCES roles(id),
    empresa INTEGER REFERENCES empresas(id),
    contrasena VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(255),
    foto_perfil VARCHAR(255),
    fecha_crea TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    id_empresa INTEGER REFERENCES empresas(id),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado BOOLEAN NOT NULL
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cuenta VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(255),
    correo VARCHAR(255),
    estado INTEGER NOT NULL
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    color VARCHAR(50),
    talla VARCHAR(50),
    tipo VARCHAR(50),
    precio_compra MONEY NOT NULL,
    precio_venta MONEY NOT NULL,
    stock INTEGER NOT NULL
);

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE estados_facturas(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(100)
);
CREATE TABLE estados_deudas(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(100)
);
CREATE TABLE estados_envios(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(100)
);

CREATE TABLE venta_detalle (
    id SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id),
    id_cliente INTEGER REFERENCES clientes(id),
    id_producto INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio MONEY NOT NULL,
    id_estado_factura INTEGER REFERENCES estados_facturas(id),
    id_estado_deuda INTEGER REFERENCES estados_deudas(id),
    id_estado_envio INTEGER REFERENCES estados_envios(id)
);

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto MONEY NOT NULL,
    metodo_pago VARCHAR(255),
    observaciones TEXT
);

-- Constraints for foreign keys
ALTER TABLE ventas ADD CONSTRAINT fk_ventas_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id);
ALTER TABLE venta_detalle ADD CONSTRAINT fk_venta_detalle_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id);
ALTER TABLE venta_detalle ADD CONSTRAINT fk_venta_detalle_producto FOREIGN KEY (id_producto) REFERENCES productos(id);
ALTER TABLE pagos ADD CONSTRAINT fk_pagos_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id);
ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_rol FOREIGN KEY (rol) REFERENCES roles(id);
ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_empresa FOREIGN KEY (empresa) REFERENCES empresas(id);
ALTER TABLE contratos ADD CONSTRAINT fk_contratos_empresa FOREIGN KEY (id_empresa) REFERENCES empresas(id);
