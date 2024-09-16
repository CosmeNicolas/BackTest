/* const usuarios = [
  {
    id:1,
    nombreUsuario: "Nico2024",
    emailDelUsuario: "nicoUsuario@gmail.com",
    constrasenia: "123456789",
  },
];
 */

const UsuarioModel = require('../models/usuario.schema')
/* bcrypt Bcrypt */
const bcrypt = require('bcrypt')
/* crear usuario  */
const nuevoUsuario = async (body)=>{
  try {
    /* Usuario logueado o no  */
    const usuarioExiste = await UsuarioModel.findOne({nombreUsuario: body.nombreUsuario})
    if(usuarioExiste){
      return 400
    }
    /* Usuario logueado o no */
    /* traemos la constraseña y la hasheamos */
    let salt = bcrypt.genSaltSync();
    /* cantidad de saltos de encirptacion - xdefcto 10 */
    body.constrasenia = bcrypt.hashSync(body.constrasenia, salt)
    /* tomamos la contraseña del body del usuario + salt  y lo mandamos encriptado*/
    /* bcrypt Bcrypt */

    
    const usuario =  new UsuarioModel(body)
    await usuario.save()
    return 201
  } catch (error) {
    console.log(error)
  }
}

/* Inicio Sesion Service  */
const inisioSesion = async(body)=>{
  try {
    /* Usuario logueado o no  */
    const usuarioExiste = await UsuarioModel.findOne({nombreUsuario: body.nombreUsuario})
    if(!usuarioExiste){
      return 400
    }

    /* si no existe comparo contraseñas */
    const verificoContrasenia = bcrypt.compareSync(body.constrasenia, usuarioExiste.constrasenia)

    if(verificoContrasenia){
      return 200
    }else{
      return 400
    }


    /* si no existe comparo contraseñas */
  } catch (error) {
    console.log(error)
  }
}
/* mostrar todos los usuarios  */
const todosLosUsuarios = async ()=>{
  try {
     const usuarios = await UsuarioModel.find()
     return usuarios
  } catch (error) {
    console.log(error)
  }
}

/* obtener un usuarios services */
const obtenerUnUsuario = async (idUsuario)=>{
  try {
   
    const usuario = await UsuarioModel.findOne({_id: idUsuario})
    /* retornamos el usuario encontrado */
    return usuario
  } catch (error) {
    console.log(error)
  }
}

/* baja del usuarioCompleto */
const bajaUsuario = async(idUsuario)=>{
  try {
     await UsuarioModel.findByIdAndDelete({_id: idUsuario})
     return 200 
  } catch (error) {
   console.log(error) 
  }
}

/* actualizacion del usuario - baja o no  */
const actualizoUsuarioLogica = async (idUsuario) => {
  const usuario = await UsuarioModel.findOne({ _id: idUsuario });
   usuario.bloqueado = !usuario.bloqueado
   /*  si quiero cambiar lso roles enum , en schema de DB */

   const actualizarUsuario = await  UsuarioModel.findByIdAndUpdate({ _id: idUsuario }, usuario, { new: true });
  return actualizarUsuario;
};

/* exportamos los modulos para los controlers */
module.exports = {
  nuevoUsuario, 
  todosLosUsuarios, 
  obtenerUnUsuario,
  bajaUsuario,
  actualizoUsuarioLogica,
  inisioSesion
}