/* desestructuramos el schema y el modelo */
const {Schema, Model, model} = require('mongoose')

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  constrasenia : {
    type: String,
    required: true,
    trim: true
  },
  role:{
    type:String,
    default: 'usuario',
  },
  bloqueado:{
    type: Boolean,
    default: false
  }
})

const UsuarioModel = model('user',UsuarioSchema)
module.exports = UsuarioModel