import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async dispatch => {
    dispatch(agregarProducto())

    try {
      // Insertar en la API
      await clienteAxios.post('/productos', producto)

      // Si todo sale bien, actualizamos el state
      dispatch(agregarProductoExito(producto))

      // Alerta
      Swal.fire('Correcto', 'El producto se agrego correctamente', 'success')
    } catch (error) {
      console.log(error)
      dispatch(agregarProductoError(true))
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
})

// Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
})

// Si hubo algun error
const agregarProductoError = () => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: true,
})
