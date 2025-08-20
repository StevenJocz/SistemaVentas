"use client";
import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import style from './Ventas.module.css';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import { Tabla } from '@/components/tabla';
import { VentaModel, DetalleVentaModel } from './Ventas.model';
import { fetchVentaById } from './Ventas.service';
import { formatMoneda } from '@/utils/ConvertirMoneda';
import { formatFecha } from '@/utils/ConvertirFecha';

interface Props {
    id: number;
    onClose: () => void;
}

const ListVentas: React.FC<Props> = ({ id, onClose }) => {
    const [venta, setVenta] = useState<VentaModel | null>(null);
    const [detalles, setDetalles] = useState<DetalleVentaModel[]>([]);

    useEffect(() => {
        const loadVenta = async () => {
            const data = await fetchVentaById(id);
            if (data) {
                setVenta(data);
                const detallesFormateados = data.detalles?.map(detalle => ({
                    ...detalle,
                    total: formatMoneda(detalle.total),
                })) || [];
                setDetalles(detallesFormateados);
            }
        };
        loadVenta();
    }, [id]);

    const handleRegistrar = async (values: FormikValues) => {
        console.log(values);
    };

    return (
        <div className={style.AddVentas}>
            <div className={style.AddVentas_Header}>
                <button onClick={onClose}><IoArrowBack /> Volver a la lista</button>
                <p>Detalles de la venta. Aquí encontrarás y gestionarás su información.</p>
            </div>

            {venta && (
                <div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            fecha: formatFecha(venta.fecha),
                            total: formatMoneda(venta.total),
                        }}
                        validate={(values) => {
                            let errors: any = {};
                            if (!values.fecha) {
                                errors.fecha = 'La fecha es obligatoria.';
                            }
                            return errors;
                        }}
                        onSubmit={handleRegistrar}
                    >
                        {({ values, errors, setFieldValue }) => (
                            <Form>
                                <div className={style.Formulario_Dos}>
                                    <div>
                                        <StyledTextField
                                            name="fecha"
                                            label="Fecha"
                                            variant="outlined"
                                            size="small"
                                            value={values.fecha}
                                            onChange={(e) => setFieldValue('fecha', e.target.value)}
                                        />
                                        <ErrorMessage name="fecha" component={() => <p className={style.Error}>{errors.fecha}</p>} />
                                    </div>
                                    <div>
                                        <StyledTextField
                                            name="total"
                                            label="Total"
                                            variant="outlined"
                                            size="small"
                                            value={values.total}
                                            onChange={(e) => setFieldValue('total', e.target.value)}
                                        />
                                        <ErrorMessage name="total" component={() => <p className={style.Error}>{errors.total}</p>} />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}

            <div className={style.Ventas_Body}>
                <Tabla
                    data={detalles}
                    verBotonEditar={true}
                />
            </div>
        </div>
    );
};

export default ListVentas;
