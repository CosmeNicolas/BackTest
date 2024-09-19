/* desestructuramos el schema y el modelo */
const {Schema,model} = require('mongoose')

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "usuario",
    enum: ["usuario", "admin"],
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  idCarrito: {
    type: String,
  },
  idFavoritos: {
    type: String,
  },
});

/* no mostrar desde el esquema la contraseña */
UsuarioSchema.methods.toJSON = function(){ 
  /* desestructuro lo q quiero sacar */ 
  const {contrasenia,__v
, ...usuario} = this.toObject()
  return usuario
}

const UsuarioModel = model('user',UsuarioSchema)
module.exports = UsuarioModel