const mongoose = require("mongoose");

const Producto = new mongoose.Schema({
  nombre:  {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  descripcion: {
    type: String,
    required: [true, 'Ladescripcion es obligatorio'],
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
