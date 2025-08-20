import React from 'react'
import style from './Ventas.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledSelect, StyledTextField } from '@/utils/MaterialUI';
import { MenuItem } from '@mui/material';

interface Props {
  onClose: () => void;
}


const AddVentas: React.FC<Props> = ({ onClose }) => {

  const handleRegistrar = async (values: FormikValues) => {
    console.log(values);
  };

  return (
    <div className={style.AddVentas}>
      <div className={style.AddVentas_Header}>
        <button onClick={onClose}><IoArrowBack /> Volver a la lista</button>
        <p>Aquí podrás registrar una nueva venta. Completa los campos necesarios y guarda la información.</p>
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            producto: '',
            cantidad: '',
            cliente: '',
            total: '',
            descuento: '',
          }}
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          onSubmit={handleRegistrar}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <div className={style.Formulario_Dos}>
                <div>
                  <StyledSelect
                    id="outlined-select-currency"
                    select
                    label="Producto"
                    size="small"
                    variant="outlined"
                    value={values.producto}
                    onChange={(e) => setFieldValue('producto', e.target.value)}
                  >
                    <MenuItem value='0'>
                      Seleccione
                    </MenuItem>
                  </StyledSelect>
                  <ErrorMessage name='producto' component={() => <p className={style.Error}>{errors.producto}</p>} />
                </div>
              </div>
              <div className={style.Formulario_Dos}>

                <div>
                  <StyledTextField
                    name="cantidad"
                    label="Cantidad"
                    placeholder='Ingrese cantidad'
                    variant="outlined"
                    size="small"
                    value={values.cantidad}
                    onChange={(e) => setFieldValue('cantidad', e.target.value)}
                  />
                  <ErrorMessage name="cantidad" component={() => <p className={style.Error}>{errors.cantidad}</p>} />
                </div>
                <div>
                  <StyledTextField
                    name="descuento"
                    label="Descuento"
                    placeholder='Ejm: $10000'
                    variant="outlined"
                    size="small"
                    value={values.descuento}
                    onChange={(e) => setFieldValue('descuento', e.target.value)}
                  />
                  <ErrorMessage name="descuento" component={() => <p className={style.Error}>{errors.descuento}</p>} />
                </div>
                <div>
                  <StyledTextField
                    name="total"
                    label="Total"
                    placeholder='Ejm: $10000'
                    variant="outlined"
                    size="small"
                    value={values.total}
                    onChange={(e) => setFieldValue('total', e.target.value)}
                  />
                  <ErrorMessage name="total" component={() => <p className={style.Error}>{errors.total}</p>} />
                </div>

              </div>
              <div className={style.Formulario_Dos}>
                <div>
                  <StyledSelect
                    id="outlined-select-currency"
                    select
                    label="Cliente"
                    size="small"
                    variant="outlined"
                    value={values.cliente}
                    onChange={(e) => setFieldValue('cliente', e.target.value)}
                  >
                    <MenuItem value='0'>
                      Seleccione
                    </MenuItem>
                  </StyledSelect>
                  <ErrorMessage name='producto' component={() => <p className={style.Error}>{errors.cliente}</p>} />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddVentas