/* acá guardamos la lógica de negocio */
/* let productos = [
  {
    id: 1,
    nombre: "celurar",
    precio: 10000,
  },
  {
    id: 2,
    nombre: "tablet",
    precio: 12000,
  },
];  */

/* CON DB - TRAER EL MODELO DE MONGOOSE */
const ProductoModel = require('../models/producto.schema')



/* obtener todos los productos */
const getProductos = async()=>{
  const obtenerProducto = await ProductoModel.find()
  return obtenerProducto
}
/* obtener un producto */
const getProducto = async (id)=>{
  const producto = await ProductoModel.findOne({_id: id})
  return producto
}
/* nuevo producto */
const nuevoProducto = (body)=>{
  try {
    const nuevoProducto = new ProductoModel(body)
    return nuevoProducto
    console.log(nuevoProducto)
  } catch (error) {
    console.log(error)
  }
 
}

const editarProducto = async (id, body)=>{
  try {
    const productoEditado = await ProductoModel.findByIdAndUpdate({_id: id}, body, {new:true})
    /* estas propiedades , id, body y new true , nos trae el ultimo dato actualizado */
    return productoEditado
  } catch (error) {
    console.log(error)
  }
}

const eliminarProductoPorId =async (id) => {
  try {
/* solo pasamos el modelo para eliminar el producto */
    await ProductoModel.findByIdAndDelete({_id: id})
    return 200
  } catch (error) {
    console.log(error);
  }
};
/* exporto las funciones */
module.exports = {
  getProducto,
  getProductos,
  nuevoProducto,
  editarProducto,
  eliminarProductoPorId
}