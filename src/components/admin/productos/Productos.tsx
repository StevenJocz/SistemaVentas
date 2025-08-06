"use client"
import { useEffect, useState } from 'react';
import style from './Productos.module.css';
import Link from 'next/link';
import { RoutesAdmin } from '../nav/AdminNav.model';
import { IoAdd, IoChevronForwardOutline } from 'react-icons/io5';
import { Tabla } from '@/components/tabla';
import { ProductoModel } from './Productos.model';
import AddProductos from './AddProductos';
import { fetchData } from './Productos.service';

const Productos = () => {
   const [data, setData] = useState<Partial<ProductoModel>[]>([]);
   
    const [verAdd, setVerAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

   

      const handleData = async () => {
        const dataFetch: ProductoModel[] = await fetchData();
    
        const camposReducidos = dataFetch?.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            color: producto.color,
            talla: producto.talla,
            tipo: producto.tipo,    
            compra: producto.precio_compra,
            venta: producto.precio_venta,
            stock: producto.stock,
        })) || [];
    
        setData(camposReducidos);
    }

    const handleVerAdd = (id: number) => {
        setId(id);
        setVerAdd(!verAdd);
    }

    const handleOnClose = () => {
        setVerAdd(false);
        handleData();
    }
    return (
        <div className={style.Productos}>
            <div className={style.Productos_Header}>
                <h1><span>Productos</span></h1>
                <div className={style.Productos_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.PRODUCTOS.path}`} className={style.Seleccionado}>
                        {RoutesAdmin.PRODUCTOS.name}
                    </Link>
                </div>
            </div>
            {verAdd ? (
                <AddProductos
                    id={id}
                    onClose={() => handleOnClose()}
                />
            ) : (
                <>
                    <p className={style.Productos_Texto}>En este módulo encontrarás todas las opciones relacionadas con la gestión de productos.</p>
                    <button
                        className={style.Productos_Button}
                        onClick={() => handleVerAdd(0)}
                    >
                        <IoAdd />
                        Añadir Producto
                    </button>
                    <div className={style.Productos_Body}>
                        <Tabla
                            data={data}
                            verBotonEditar={true}
                            mostrarRegistro={handleVerAdd}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Productos