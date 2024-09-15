const serviciosProductos = require('../services/productos.services')


const obtenerProductos = async (req, res) => {
  /* Request - Es la petición que el front nos envia al back */
  /* Res - Es la respuesta del back que envia al front */
  /* response - status - formato ({es la estructura de respuesta})*/
  /* hacemos ambas peticiones todos y id en una sola peticion */
  /* ejemplo de peticion pro query 
  http://localhost:3001/api/productos/?id=66e638276e4e977c4d438a9d */
  try {
    const id = req.query.id;
   if(id){
      const producto  = await serviciosProductos.getProducto(id)
      res.status(200).json({msg:'Producto encontrado', producto})
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

const actualizarProdcutoxID = async (req, res) => {
  try {
    id = req.params.id
    const productoActualizado = await serviciosProductos.editarProducto(id, req.body)
    res.status(200).json({msg:'Producto actualizado',productoActualizado});
  } catch (error) {
    res.status(500).json({ msg: "Productos no actualizado", error });
  }
}

const eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id
    let respuesta = await serviciosProductos.eliminarProductoPorId(id)
    if(respuesta === 200){
      res.status(200).json({msg: 'producto borrado'});
    }else{
      res.status(400).json({msg: 'Error al borrar borrado'})
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