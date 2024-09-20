/* acá guardamos la lógica de negocio */

/* CON DB - TRAER EL MODELO DE MONGOOSE */
const ProductoModel = require('../models/producto.schema')
const cloudinary = require('../helpers/cloudinary')
const UsuarioModel = require('../models/usuario.schema')
const CarritoModel = require('../models/carrito.schema')
const FavModel = require('../models/favorito.schema')


/* obtener todos los productos */
const getProductos = async(limit, to)=>{
  /* const obtenerProducto = await ProductoModel.find()
  return obtenerProducto */
  /* PAGINACION */
  const [productos, cantidadTotal] = await Promise.all([
    /* traemos el modelo, buscamos, desde y hasta */
    ProductoModel.find(/* {activo: true} */).skip(to * limit).limit(limit),
    /* para traer los activos pasar en true */
   /*  ProductoModel.countDocuments({activo: true}) */
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




/* FiltrarProductos */
const buscarProducto = async (palabra) => {
  /* usamos expresiones regulares */
  try {
    const condicionBusqueda = new RegExp(
      palabra,
      "i"
    ); /* la marca la palabra que sea indistinta */
    const productos = await ProductoModel.find({
      /* para buscar multiple , usamos el operador or de mongo que recibe un array */
       $or:[
       { nombre: condicionBusqueda},
       { descripcion: condicionBusqueda},
       ]
      });
    return productos
    
  } catch (error) {
    console.log(error)
  }
};
/* FiltrarProductos */

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

/* AgregarProducto  carrito*/
const agregarProducto = async (idUsuario, idProducto)=>{
  const usuario = await UsuarioModel.findById(idUsuario)
  const producto = await ProductoModel.findOne({_id: idProducto})
  const carrito = await CarritoModel.findOne({_id: usuario.idCarrito})
  
  /* chequeamos q el pruducto exista */
  const productoExiste = carrito.productos.find((prod)=> prod._id.toString() === producto._id.toString())
  if(productoExiste){
    return {
      msg: 'Producto ya existe en el carrito',
      statusCode: 400
    }
  }
  carrito.productos.push(producto)
  await carrito.save()

  return {
    msg:'Producto agregado al carrito',
    statusCode: 200
  }

}
/* AgregarProducto */

/* Quitar producto  carrito*/
const quitarProducto = async (idUsuario, idProducto)=>{
  const usuario = await UsuarioModel.findById(idUsuario)
  const producto = await ProductoModel.findOne({_id: idProducto})
  const carrito = await CarritoModel.findOne({_id: usuario.idCarrito})
  
  /* chequeamos q el pruducto exista */
  const posicionProducto = carrito.productos.findIndex((prod)=> prod._id.toString() === producto._id.toString())

  if(posicionProducto < 0){
    return {
      msg:'El producto no se encontro',
      statusCode: 400
    }
  }
  carrito.productos.splice(posicionProducto,1)
  
  await carrito.save()
  
  return {
    msg:'Producto Eliminado del carrito',
    statusCode: 200
  }

}
/* Quitar producto */



/* FAVORITOS - AGREGAR - QUITAR */
/* AgregarProducto  carrito*/
const agregarProductoFav = async (idUsuario, idProducto)=>{
  const usuario = await UsuarioModel.findById(idUsuario)
  const producto = await ProductoModel.findOne({_id: idProducto})
  const favoritos = await FavModel.findOne({_id: usuario.idFavoritos})
  
  /* chequeamos q el pruducto exista */
  const productoExiste = favoritos.productos.find((prod)=> prod._id.toString() === producto._id.toString())
  if(productoExiste){
    return {
      msg: 'Producto ya existe en el favoritos',
      statusCode: 400
    }
  }
  favoritos.productos.push(producto)
  await favoritos.save()

  return {
    msg:'Producto agregado a favoritos',
    statusCode: 200
  }

}
/* AgregarProducto */

/* Quitar producto  carrito*/
const quitarProductoFav = async (idUsuario, idProducto)=>{
  const usuario = await UsuarioModel.findById(idUsuario)
  const producto = await ProductoModel.findOne({_id: idProducto})
  const favoritos = await FavModel.findOne({_id: usuario.idFavoritos})
  
  /* chequeamos q el pruducto exista */
  const posicionProducto = favoritos.productos.findIndex((prod)=> prod._id.toString() === producto._id.toString())
  favoritos.productos.splice(posicionProducto,1)
  
  /* manejo de findIndex - por sobre borrado si el arreglo esta vacio */
  console.log(posicionProducto)
  if(posicionProducto < 0){
    return {
      msg:'El producto no se encontro',
      statusCode: 400
    }
  }

  await favoritos.save()
  
  return {
    msg:'Producto Eliminado de Favoritos',
    statusCode: 200
  }

}
/* Quitar producto */
/* FAVORITOS - AGREGAR - QUITAR */

/* exporto las funciones */
module.exports = {
  getProducto,
  getProductos,
  nuevoProducto,
  editarProducto,
  eliminarProductoPorId,
  buscarProducto,
  agregarImagen,
  agregarProducto,
  quitarProducto,
  agregarProductoFav,
  quitarProductoFav
}