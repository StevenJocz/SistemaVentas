import { useEffect, useState } from 'react';
import style from './Cliente.module.css'
import { ClientesModel } from './Cliente.model';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { IoCloseCircle } from 'react-icons/io5';
import { StyledTextField } from '@/utils/MaterialUI';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { fetchId } from './Cliente.service';
interface Props {
    id: number;
    onClose: () => void;
}

const AddCliente: React.FC<Props> = ({ id, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ClientesModel>();

    useEffect(() => {
        if (id > 0) {
            handleData(id);
            
        }
    }, [id]);

    const handleData = async (id: number) => {
        try {
            const dataFetch = await fetchId(id);
            setData(dataFetch);
        } catch (error) {
            console.error('Error al obtener la dependencia:', error);
        }
    };

    const handleRegistrar = async (values: FormikValues) => {
        setIsLoading(true);



        try {
            if (id > 0) {

            } else {

            }
        } catch (error) {
            console.error('Error al registrar:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={style.Add}>
            <div className={style.Add_Content}>
                <div className={style.Add_Content_Encabezado}>
                    <h2>Clientes</h2>
                    <IoCloseCircle
                        className={style.Add_Content_Encabezado_Icono}
                        onClick={onClose}
                    />
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        nombre: data?.nombre || '',
                        telefono: data?.telefono || '',
                        correo: data?.correo || '',
                        tiktok:'',
                        instagram:  '',   
                        facebook:  '',
                        x: '',
                        youtube:  '',
                    }}
                    validate={(values) => {
                        let errors: any = {};
                        if (!values.nombre) {
                            errors.nombre = 'El campo nombre del cliente es obligatorio.';
                        }

                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, errors, setFieldValue, isSubmitting }) => (
                        <Form>
                            <div className={style.Formulario_Dos}>
                                <div>
                                    <StyledTextField
                                        name='nombre'
                                        label="Nombre del cliente"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce nombre'
                                        value={values.nombre}
                                        onChange={(e) => setFieldValue('nombre', e.target.value)}
                                    />
                                    <ErrorMessage name='nombre' component={() => <p className={style.Error}>{errors.nombre}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='telefono'
                                        label="Número de teléfono"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce el numero de teléfono'
                                        value={values.telefono}
                                        onChange={(e) => setFieldValue('nit', e.target.value)}
                                    />
                                    <ErrorMessage name='telefono' component={() => <p className={style.Error}>{errors.telefono}</p>} />
                                </div>
                            </div>
                            <div className={style.Formulario_Dos}>
                                <div>
                                    <StyledTextField
                                        name='correo'
                                        label="Correo electrónico"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce el correo electrónico'
                                        value={values.correo}
                                        onChange={(e) => setFieldValue('correo', e.target.value)}
                                    />
                                    <ErrorMessage name='correo' component={() => <p className={style.Error}>{errors.correo}</p>} />
                                </div>
                            </div>
                            <div className={style.Formulario_Dos}>
                                <div>
                                    <StyledTextField
                                        name='tiktok'
                                        label="TikTok"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce el enlace de TikTok'
                                        value={values.tiktok}
                                        onChange={(e) => setFieldValue('tiktok', e.target.value)}
                                    />
                                    <ErrorMessage name='tiktok' component={() => <p className={style.Error}>{errors.tiktok}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='instagram'
                                        label="Instagram"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce el enlace de Instagram'
                                        value={values.instagram}
                                        onChange={(e) => setFieldValue('instagram', e.target.value)}
                                    />
                                    <ErrorMessage name='instagram' component={() => <p className={style.Error}>{errors.instagram}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='facebook'
                                        label="Facebook"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce el enlace de Facebook'
                                        value={values.facebook}
                                        onChange={(e) => setFieldValue('facebook', e.target.value)}
                                    />
                                    <ErrorMessage name='facebook' component={() => <p className={style.Error}>{errors.facebook}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='x'
                                        label="X (Twitter)"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce el enlace de X'
                                        value={values.x}
                                        onChange={(e) => setFieldValue('x', e.target.value)}
                                    />
                                    <ErrorMessage name='x' component={() => <p className={style.Error}>{errors.x}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='youtube'
                                        label="YouTube"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce el enlace de YouTube'
                                        value={values.youtube}
                                        onChange={(e) => setFieldValue('youtube', e.target.value)}
                                    />
                                    <ErrorMessage name='youtube' component={() => <p className={style.Error}>{errors.youtube}</p>} />
                                </div>
                            </div>
                            <ButtonSubmit
                                id={id}
                                isLoading={isLoading}
                                isSubmitting={isSubmitting}
                                onClose={onClose}
                            />
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default AddCliente