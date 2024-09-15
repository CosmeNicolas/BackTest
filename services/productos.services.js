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

const editarProducto = (id)=>{
  try {
    const id = Number(req.params.id);
    const posicionProductoEnArray = productos.findIndex(
      (producto) => producto.id === id
    );

    const productoEditado = {
      id,
      ...req.body,
    };

    productos[posicionProductoEnArray] = productoEditado;
    return productoEditado
  } catch (error) {
    console.log(error)
  }
}

const eliminarProductoPorId = (id) => {
  try {
/*     const id = Number(req.params.id); */
    const posicionProductoEnArray = productos.findIndex(
      (producto) => producto.id !== id
    );
    productos.splice(posicionProductoEnArray, 1);
    return "Producto borrado";
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