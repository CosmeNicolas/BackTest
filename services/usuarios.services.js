/* const usuarios = [
  {
    id:1,
    nombreUsuario: "Nico2024",
    emailDelUsuario: "nicoUsuario@gmail.com",
    contrasenia: "123456789",
  },
];
 */
/* JWT - encriptamiento */
const jwt = require('jsonwebtoken')

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
    /* chequeamos el usaurio */
    if(body.role !== 'usuario' && body.rol !== 'admin' ){
      return 409
    }
    /* Usuario logueado o no */
    /* traemos la constraseña y la hasheamos */
    let salt = bcrypt.genSaltSync();
    /* cantidad de saltos de encirptacion - xdefcto 10 */
    body.contrasenia = bcrypt.hashSync(body.contrasenia, salt)
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
      return {code: 400}
    }

    /* si no existe comparo contraseñas */
    const verificoContrasenia = bcrypt.compareSync(body.contrasenia, usuarioExiste.contrasenia)

    if(verificoContrasenia){
      const payload = {
        /* guardamos los datos que vamos encriptar del usario existente */
        _id: usuarioExiste._id,
        role: usuarioExiste.role,
        bloqueado: usuarioExiste.bloqueado
      }
      /* generamos el token, le mandamos el payload y la palabra clave, expire */

      /* const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1m'}) - expira en un minuto */
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      /* retornamos el token  */
      return{
        code: 200,
        token
      } 
    }else{
      return {code: 400}
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
     /* quiatr constraseña */
  /*    const ususarioSinContrasenia = []
     usuarios.forEach((usuario)=>{
      const obj = {
        _id: usuario._id,
        nombreUsuario: usuario.nombreUsuario,
        role: usuario.role,
        bloqueado: usuario.bloqueado
      }
      ususarioSinContrasenia.push(obj)
     })
     return ususarioSinContrasenia */
      /* quiatr constraseña */
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