/* acá guardamos la lógica de negocio */
let productos = [
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
]; 
/* obtener todos los productos */
const getProductos = ()=>{
  return productos
}
/* obtener un producto */
const getProducto = (id)=>{
  const producto = productos.find((prod) => prod.id === id);
  return producto
}
/* nuevo producto */
const nuevoProducto = (body)=>{
  try {
    const nuevoProducto = {
      id: productos[productos.length - 1].id +1,
      ...body
    }
   
    productos.push(nuevoProducto);
    return nuevoProducto
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