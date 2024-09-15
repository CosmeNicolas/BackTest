const mongoose = require("mongoose");

const Producto = new mongoose.Schema({
  nombre:  {
    type: String,
    /* le decimos al back que el campo es requerido con un msj */
    required: [true, 'El nombre es obligatorio'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripcion es obligatorio'],
  },
  precio:  {
    type: Number,
    required: [true, 'El precio es obligatorio'],
  },
});

/* creamos el modelo del esquema */
const ProductoModel = mongoose.model("producto", Producto);
/* exportamos  */
module.exports = ProductoModel;
