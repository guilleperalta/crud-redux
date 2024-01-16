import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

// Redux
import { useDispatch } from 'react-redux'
import {
  borrarProductoAction,
  obtenerProdutoEditar,
} from '../actions/productoActions'

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto
  const dispatch = useDispatch()

  // Habilitar redireccion
  const navigate = useNavigate()

  // Confirmar si desea eliminarlo
  const confirmarEliminarProducto = id => {
    // Preguntar al usuario
    Swal.fire({
      title: '¿Estas seguro de eliminar??',
      text: 'Si eliminas, no se puede recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then(result => {
      if (result.isConfirmed) {
        // Pasar al action
        dispatch(borrarProductoAction(id))
      }
    })
  }

  // Funcion que redirige de forma programada
  const redireccionarEdicion = producto => {
    dispatch(obtenerProdutoEditar(producto))
    navigate(`/productos/editar/${producto.id}`)
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Producto
