-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "tiktok" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255),
    "correo" VARCHAR(255),
    "estado" INTEGER NOT NULL,
    "instagram" VARCHAR(255),
    "x" VARCHAR(255),
    "youtube" VARCHAR(255),
    "facebook" VARCHAR(255),
    "id_usuario" INTEGER,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" SERIAL NOT NULL,
    "id_empresa" INTEGER,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_deudas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),

    CONSTRAINT "estados_deudas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_envios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),

    CONSTRAINT "estados_envios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_facturas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),

    CONSTRAINT "estados_facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagos" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "monto" MONEY NOT NULL,
    "metodo_pago" VARCHAR(255),
    "observaciones" TEXT,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "color" VARCHAR(50),
    "talla" VARCHAR(50),
    "tipo" VARCHAR(50),
    "precio_compra" MONEY NOT NULL,
    "precio_venta" MONEY NOT NULL,
    "stock" INTEGER NOT NULL,
    "id_usuario" INTEGER,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventario" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_compra" MONEY NOT NULL,
    "precio_venta" MONEY NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "rol" VARCHAR(255) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "usuario" VARCHAR(255) NOT NULL,
    "rol" INTEGER,
    "empresa" INTEGER,
    "contrasena" VARCHAR(255) NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255),
    "foto_perfil" VARCHAR(255),
    "fecha_crea" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venta_detalle" (
    "id" SERIAL NOT NULL,
    "id_venta" INTEGER,
    "id_cliente" INTEGER,
    "id_producto" INTEGER,
    "cantidad" INTEGER NOT NULL,
    "precio" MONEY NOT NULL,
    "id_estado_factura" INTEGER,
    "id_estado_deuda" INTEGER,
    "id_estado_envio" INTEGER,

    CONSTRAINT "venta_detalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cuenta_key" ON "clientes"("tiktok");

-- CreateIndex
CREATE INDEX "inventario_id_producto_idx" ON "inventario"("id_producto");

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagos" ADD CONSTRAINT "fk_pagos_cliente" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuarios_empresa" FOREIGN KEY ("empresa") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuarios_rol" FOREIGN KEY ("rol") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venta_detalle" ADD CONSTRAINT "fk_venta_detalle_cliente" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venta_detalle" ADD CONSTRAINT "fk_venta_detalle_producto" FOREIGN KEY ("id_producto") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venta_detalle" ADD CONSTRAINT "venta_detalle_id_estado_deuda_fkey" FOREIGN KEY ("id_estado_deuda") REFERENCES "estados_deudas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venta_detalle" ADD CONSTRAINT "venta_detalle_id_estado_envio_fkey" FOREIGN KEY ("id_estado_envio") REFERENCES "estados_envios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venta_detalle" ADD CONSTRAINT "venta_detalle_id_estado_factura_fkey" FOREIGN KEY ("id_estado_factura") REFERENCES "estados_facturas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venta_detalle" ADD CONSTRAINT "venta_detalle_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "fk_ventas_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
