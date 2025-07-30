"use client"
import { useEffect, useState } from 'react';
import style from './Cliente.module.css'
import Link from 'next/link';
import { IoAdd, IoChevronForwardOutline } from 'react-icons/io5';
import { Tabla } from '@/components/tabla';
import { RoutesAdmin } from '../nav/AdminNav.model';
import AddCliente from './AddCliente';
import { ClientesModel } from './Cliente.model';
import { fetchData } from './Cliente.service';

const Cliente = () => {
   const [data, setData] = useState<ClientesModel[]>([]);
    const [verAdd, setVerAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = async () => {
        const dataFetch: ClientesModel[] = await fetchData();
        setData(dataFetch);
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
        <div className={style.Cliente}>
            <div className={style.Cliente_Header}>
                <h1><span>Clientes</span></h1>
                <div className={style.Cliente_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.CLIENTES.path}`} className={style.Seleccionado}>
                        {RoutesAdmin.CLIENTES.name}
                    </Link>
                </div>
            </div>
            {verAdd ? (
                <AddCliente
                    id={id}
                    onClose={() => handleOnClose()}
                />
            ) : (
                <>
                    <p className={style.Cliente_Texto}>En este módulo encontrarás todas las opciones relacionadas con la gestión de clientes.</p>
                    <button
                        className={style.Cliente_Button}
                        onClick={() => handleVerAdd(0)}
                    >
                        <IoAdd />
                        Crear cliente
                    </button>
                    <div className={style.Cliente_Body}>
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

export default Cliente