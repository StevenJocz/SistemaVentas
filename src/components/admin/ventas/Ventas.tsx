
"use client"
import { useEffect, useState } from 'react';
import style from './Ventas.module.css';
import Link from 'next/link';
import { RoutesAdmin } from '../nav/AdminNav.model';
import { IoAdd, IoChevronForwardOutline } from 'react-icons/io5';
import { Tabla } from '@/components/tabla';
import { VentaModel } from './Ventas.model';
import { fetchData } from './Ventas.service';
import { formatMoneda } from '@/utils/ConvertirMoneda';
import { formatFecha } from '@/utils/ConvertirFecha';
import AddVentas from './AddVentas';
import ListVentas from './ListVentas';

const Ventas = () => {
  const [data, setData] = useState<Partial<VentaModel>[]>([]);

  const [verAdd, setVerAdd] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    handleData();
  }, []);


  const handleData = async () => {
    const dataFetch: VentaModel[] = await fetchData();

    const camposReducidos = dataFetch?.map(venta => ({
      id: venta.id,
      fecha: formatFecha(venta.fecha),
      total: formatMoneda(venta.total),
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
    <div className={style.Ventas}>
      <div className={style.Ventas_Header}>
        <h1><span>Ventas</span></h1>
        <div className={style.Ventas_Header_Navegacion}>
          <Link href={`${RoutesAdmin.INICIO.path}`}>
            Admin
          </Link>
          <IoChevronForwardOutline className={style.Icono} />
          <Link href={`${RoutesAdmin.VENTAS.path}`} className={style.Seleccionado}>
            {RoutesAdmin.VENTAS.name}
          </Link>
        </div>
      </div>
      {verAdd ? (
        id === 0 ? (
          <AddVentas onClose={handleOnClose} />
        ) : (
          <ListVentas id={id} onClose={handleOnClose} />
        )
      ) : (
        <>
          <p className={style.Ventas_Texto}>En este módulo encontrarás todas las opciones relacionadas con la gestión de ventas.</p>
          <button
            className={style.Ventas_Button}
            onClick={() => handleVerAdd(0)}
          >
            <IoAdd />
            Registrar venta
          </button>
          <div className={style.Ventas_Body}>
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

export default Ventas