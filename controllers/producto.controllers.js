const serviciosProductos = require('../services/productos.services')


const obtenerProductos = async (req, res) => {
  /* Request - Es la petición que el front nos envia al back */
  /* Res - Es la respuesta del back que envia al front */
  /* response - status - formato ({es la estructura de respuesta})*/
  /* hacemos ambas peticiones todos y id en una sola peticion */
  try {
    const id = Number(req.query.id);
    if (id) {
      const producto = await serviciosProductos.getProducto(id)
      if (!producto) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
      }
      res.status(200).json(producto);
    } else {
      const productos = await serviciosProductos.getProductos()
      res.status(200).json({ msg: "Productos encontrados", productos });
    }
  } catch (error) {
    /* response - status - formato */
    res.status(500).json({ msg: "Productos no encontrados", error });
  }
};

const crearProducto = async(req, res) => {
  /* creamos - info x body */
  try {
    const respuesta = await serviciosProductos.nuevoProducto(req.body)
    await respuesta.save()
    res.status(201).json(respuesta);
  } catch (error) {
    res.status(500).json({ msg: "Productos no encontrados", error });
  }
}

const actualizarProdcutoxID =  (req, res) => {
  try {
    const productoActualizado = serviciosProductos.editarProducto(id)
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ msg: "Productos no actualizado", error });
  }
}

const eliminarProducto = (req, res) => {
  try {
    const id = Number(req.params.id)
    let res = serviciosProductos.eliminarProductoPorId(id)
    if(res === 200){
      res.status(200).json({msg: 'producto borrado'});
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al borrar", error });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProdcutoxID,
  eliminarProducto
}