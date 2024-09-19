/* creamos el modelo del carrito  */
const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema({
/* el carrito tiene el id del usuario y los productos que los guardamos en un array  */
  idUsuario:{
    type: String,
  },
  productos:[]
})
/* exportamos el carrito , con el nombre y el schema */
const FavModel = mongoose.model('fav', FavSchema)
/* ahora exportamos el modelo */
module.exports = FavModel