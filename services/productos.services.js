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
/* exporto las funciones */
module.exports = {
  getProducto,
  getProductos
}