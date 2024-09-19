/* acá guardamos la lógica de negocio */

/* CON DB - TRAER EL MODELO DE MONGOOSE */
const ProductoModel = require('../models/producto.schema')
const cloudinary = require('../helpers/cloudinary')


/* obtener todos los productos */
const getProductos = async(limit, to)=>{
  /* const obtenerProducto = await ProductoModel.find()
  return obtenerProducto */
  /* PAGINACION */
  const [productos, cantidadTotal] = await Promise.all([
    /* traemos el modelo, buscamos, desde y hasta */
    ProductoModel.find({activo: true}).skip(to * limit).limit(limit),
    /* para traer los activos pasar en true */
    ProductoModel.countDocuments({activo: true})
  ]
  )
  const paginacion = {
    productos,
    cantidadTotal
  }
  return paginacion
  /* PAGINACION */
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

const agregarImagen = async (id, file)=>{
  /* busco el producto */
  const producto = await ProductoModel.findOne({_id:id})
  /* usamos el helper en el servicio */
  /* llamamos el metodo uploader para cargar la imagen con la ruta en cloudinary */
  const resultado = await cloudinary.uploader.upload(file.path)

  producto.imagen = resultado.secure_url
  await producto.save()
  return 200
}
/* exporto las funciones */
module.exports = {
  getProducto,
  getProductos,
  nuevoProducto,
  editarProducto,
  eliminarProductoPorId,
  agregarImagen
}