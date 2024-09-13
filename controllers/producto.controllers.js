/* creamos un objeto de productos */
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


const obtenerProductos = (req, res) => {
  /* Request - Es la petición que el front nos envia al back */
  /* Res - Es la respuesta del back que envia al front */
  /* response - status - formato ({es la estructura de respuesta})*/
  /* hacemos ambas peticiones todos y id en una sola peticion */
  try {
    const id = Number(req.query.id);
    if (id) {
      const producto = productos.find((prod) => prod.id === id);
      res.status(200).json(producto);
    } else {
      res.status(200).json({ msg: "Productos encontrados", productos });
    }
  } catch (error) {
    /* response - status - formato */
    res.status(500).json({ msg: "Productos no encontrados", error });
  }
};

const crearProducto = (req, res) => {
  /* creamos - info x body */
  try {
    /* const datProducto = req.body */
    /* const { nombre, precio} = req.body */
    /* spread operator */
    const nuevoProducto = {
      id: productos[productos.length - 1].id + 1,
      ...req.body,
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ msg: "Productos no encontrados", error });
  }
}

const actualizarProdcutoxID =  (req, res) => {
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

    res.status(200).json(productos[posicionProductoEnArray]);
  } catch (error) {
    res.status(500).json({ msg: "Productos no actualizado", error });
  }
}

const eliminarProducto = (req, res) => {
  try {
    const id = Number(req.params.id);
    const productoNoBorrado = productos.filter(
      (producto) => producto.id !== id
    );

    productos = productoNoBorrado;
    res.status(200).json(productos);
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