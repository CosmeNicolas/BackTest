const ProductoModel = require('../models/producto.schema');
const serviciosProductos = require('../services/productos.services')
const {validationResult} = require('express-validator')

const obtenerProductos = async (req, res) => {
  /* Request - Es la petición que el front nos envia al back */
  /* Res - Es la respuesta del back que envia al front */
  /* response - status - formato ({es la estructura de respuesta})*/
  /* hacemos ambas peticiones todos y id en una sola peticion */
  /* ejemplo de peticion pro query 
  http://localhost:3001/api/productos/?id=66e638276e4e977c4d438a9d */
  try {
    const id = req.query.id;
    /* paginacion */
    const limit = req.query.limit || 10
    const to = req.query.to || 0



   if(id){
      const producto  = await serviciosProductos.getProducto(id)
      res.status(200).json({msg:'Producto encontrado', producto})
    } else {
      const productos = await serviciosProductos.getProductos(limit, to)
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
      /* express validatero - validatorResult */
     /* express validator */
     const {errors} = validationResult(req)
     /* devuelve un objeto - para facilitar ver los errores    */
 
     /* console.log(errors) */
     if(errors.length){
       return res.status(400).json({msg: errors[0].msg})
     }
    const respuesta = await serviciosProductos.nuevoProducto(req.body)
    await respuesta.save()
    res.status(201).json(respuesta);
  } catch (error) {
    res.status(500).json({ msg: "Productos no encontrados", error });
  }
}

const actualizarProdcutoxID = async (req, res) => {
  try {
      /* express validatero - validatorResult */
     /* express validator */
     const {errors} = validationResult(req)
     /* devuelve un objeto - para facilitar ver los errores    */
 
     /* console.log(errors) */
     if(errors.length){
       return res.status(400).json({msg: errors[0].msg})
     }
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

/* controladro AGREGARIMAGEN */
  const agregarImagenProductoPorId = async (req, res)=>{
    try {
      /* file - multer - cloudinary */
      /* pasamos el file */
      const resultado = await serviciosProductos.agregarImagen(req.params.id, req.file)
      if(resultado === 200){
     return res.status(200).json({msg:'Se agrego imagen'})
      }
    } catch (error) {
      console.log(error)
    }
  }
/* controladro AGREGARIMAGEN */

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProdcutoxID,
  eliminarProducto,
  agregarImagenProductoPorId
}