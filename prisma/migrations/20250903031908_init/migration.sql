-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "cuenta" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255),
    "correo" VARCHAR(255),
    "instagram" VARCHAR(255),
    "x" VARCHAR(255),
    "youtube" VARCHAR(255),
    "facebook" VARCHAR(255),
    "estado" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contratos" (
    "id" SERIAL NOT NULL,
    "id_empresa" INTEGER,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."empresas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados_deudas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),

    CONSTRAINT "estados_deudas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados_envios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),

    CONSTRAINT "estados_envios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados_facturas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),

    CONSTRAINT "estados_facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pagos" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "monto" MONEY NOT NULL,
    "metodo_pago" VARCHAR(255),
    "observaciones" TEXT,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "color" VARCHAR(50),
    "talla" VARCHAR(50),
    "tipo" VARCHAR(50),
    "precio_compra" MONEY NOT NULL,
    "precio_venta" MONEY NOT NULL,
    "stock" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" SERIAL NOT NULL,
    "rol" VARCHAR(255) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuarios" (
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
CREATE TABLE "public"."venta_detalle" (
    "id" SERIAL NOT NULL,
    "id_venta" INTEGER,
    "id_cliente" INTEGER,
    "id_producto" INTEGER,
    "cantidad" INTEGER NOT NULL,
    "precio_venta" MONEY NOT NULL,
    "id_estado_factura" INTEGER,
    "id_estado_deuda" INTEGER,
    "id_estado_envio" INTEGER,
    "precio_compra" MONEY NOT NULL,

    CONSTRAINT "venta_detalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ventas" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cuenta_key" ON "public"."clientes"("cuenta");

-- AddForeignKey
ALTER TABLE "public"."contratos" ADD CONSTRAINT "contratos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "public"."empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pagos" ADD CONSTRAINT "fk_pagos_cliente" FOREIGN KEY ("id_cliente") REFERENCES "public"."clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."usuarios" ADD CONSTRAINT "fk_usuarios_empresa" FOREIGN KEY ("empresa") REFERENCES "public"."empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."usuarios" ADD CONSTRAINT "fk_usuarios_rol" FOREIGN KEY ("rol") REFERENCES "public"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."venta_detalle" ADD CONSTRAINT "fk_venta_detalle_cliente" FOREIGN KEY ("id_cliente") REFERENCES "public"."clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."venta_detalle" ADD CONSTRAINT "fk_venta_detalle_producto" FOREIGN KEY ("id_producto") REFERENCES "public"."productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."venta_detalle" ADD CONSTRAINT "venta_detalle_id_estado_deuda_fkey" FOREIGN KEY ("id_estado_deuda") REFERENCES "public"."estados_deudas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."venta_detalle" ADD CONSTRAINT "venta_detalle_id_estado_envio_fkey" FOREIGN KEY ("id_estado_envio") REFERENCES "public"."estados_envios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."venta_detalle" ADD CONSTRAINT "venta_detalle_id_estado_factura_fkey" FOREIGN KEY ("id_estado_factura") REFERENCES "public"."estados_facturas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."venta_detalle" ADD CONSTRAINT "venta_detalle_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "public"."ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "fk_ventas_usuario" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
