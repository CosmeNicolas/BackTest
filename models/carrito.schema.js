const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema({
/* el carrito tiene el id del usuario y los productos que los guardamos en un array  */
  idUsuario:{
    type: String,
  },
  productos:[]
})
/* exportamos el carrito , con el nombre y el schema */
const CarritoModel = mongoose.model('cart', CarritoSchema)
/* ahora exportamos el modelo */
module.exports = CarritoModel


