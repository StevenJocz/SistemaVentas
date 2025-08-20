import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react'
import style from './Productos.module.css';
import { IoCloseCircle } from 'react-icons/io5';
import { StyledTextField } from '@/utils/MaterialUI';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { ProductoModel } from './Productos.model';
import { createProducto, fetchId, updateProducto } from './Productos.service';

interface Props {
  id: number;
  onClose: () => void;
}

const AddProductos: React.FC<Props> = ({ id, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProductoModel>();

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
      console.error('Error al obtener los clientes:', error);
    }
  };

  const handleRegistrar = async (values: FormikValues) => {
    setIsLoading(true);

    try {
      if (id > 0) {
        if (!data) return;

        let stockCambio = false;
        let nuevoStock = 0;

        // 🔹 Verificar cambios en stock
        if (values.stock !== data.stock) {
          const diferencia = values.stock - data.stock;
          nuevoStock = diferencia;
          stockCambio = true;
        }

        // 🔹 Verificar cambios en los demás campos
        const cambios: Record<string, boolean> = {
          nombre: values.nombre !== data.nombre,
          color: values.color !== data.color,
          talla: values.talla !== data.talla,
          tipo: values.tipo !== data.tipo,
          precio_compra: values.precio_compra !== data.precio_compra,
          precio_venta: values.precio_venta !== data.precio_venta,
          stock: stockCambio,
        };

        // 🔹 Si no hubo cambios en nada, no hacemos update
        const huboCambios = Object.values(cambios).some((c) => c === true);

        if (!huboCambios) {
          console.log("No hubo cambios en ningún campo");
          onClose();
          return;
        }

        // 🔹 Valores actualizados (solo los que cambian)
        const updatedValues = {
          nombre: values.nombre,
          color: values.color,
          talla: values.talla,
          tipo: values.tipo,
          precio_compra: values.precio_compra,
          precio_venta: values.precio_venta,
          stock: stockCambio ? nuevoStock : 0, 
        };

        console.log("Valores actualizados:", updatedValues);

        const updated = await updateProducto(id, updatedValues);

        if (updated) onClose();
      } else {
        // 🔹 Nuevo producto
        const { id: _, ...cleanValues } = values;
        const created = await createProducto({
          ...cleanValues,
          id_usuario: 1,
        });
        if (created) onClose();
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={style.Add}>
      <div className={style.Add_Content}>
        <div className={style.Add_Content_Encabezado}>
          <h2>Producto</h2>
          <IoCloseCircle
            className={style.Add_Content_Encabezado_Icono}
            onClick={onClose}
          />
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            nombre: data?.nombre || '',
            color: data?.color || '',
            talla: data?.talla || '',
            tipo: data?.tipo || '',
            precio_compra: data?.precio_compra || 0,
            precio_venta: data?.precio_venta || 0,
            stock: data?.stock || 0,
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
                    label="Nombre del producto"
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
                    name='color'
                    label="Color"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce el color'
                    value={values.color}
                    onChange={(e) => setFieldValue('color', e.target.value)}
                  />
                  <ErrorMessage name='color' component={() => <p className={style.Error}>{errors.color}</p>} />
                </div>
              </div>
              <div className={style.Formulario_Dos}>
                <div>
                  <StyledTextField
                    name='talla'
                    label="Talla"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce la talla'
                    value={values.talla}
                    onChange={(e) => setFieldValue('talla', e.target.value)}
                  />
                  <ErrorMessage name='talla' component={() => <p className={style.Error}>{errors.talla}</p>} />
                </div>
                <div>
                  <StyledTextField
                    name='tipo'
                    label="Tipo"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce el tipo de producto'
                    value={values.tipo}
                    onChange={(e) => setFieldValue('tipo', e.target.value)}
                  />
                  <ErrorMessage name='tipo' component={() => <p className={style.Error}>{errors.tipo}</p>} />
                </div>
              </div>
              <div className={style.Formulario_Dos}>

                <div>
                  <StyledTextField
                    name='precio_compra'
                    label="Precio de compra"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce el precio de compra'
                    type='number'
                    value={values.precio_compra}
                    onChange={(e) => setFieldValue('precio_compra', parseFloat(e.target.value))}
                  />
                  <ErrorMessage name='precio_compra' component={() => <p className={style.Error}>{errors.precio_compra}</p>} />
                </div>
                <div>
                  <StyledTextField
                    name='precio_venta'
                    label="Precio de venta"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce el precio de venta'
                    type='number'
                    value={values.precio_venta}
                    onChange={(e) => setFieldValue('precio_venta', parseFloat(e.target.value))}
                  />
                  <ErrorMessage name='precio_venta' component={() => <p className={style.Error}>{errors.precio_venta}</p>} />
                </div>
                <div>
                  <StyledTextField
                    name='stock'
                    label="Stock"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce el stock'
                    type='number'
                    value={values.stock}
                    onChange={(e) => setFieldValue('stock', parseInt(e.target.value))}
                  />
                  <ErrorMessage name='stock' component={() => <p className={style.Error}>{errors.stock}</p>} />
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

export default AddProductos