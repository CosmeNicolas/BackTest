const serviceUsuarios = require('../services/usuarios.services')

/* servicios  */
/* crear usuario */
const crearUsuario = async (req, res) => {
  try {
    const usuario = await serviceUsuarios.nuevoUsuario(req.body)
    if(usuario === 201){
      res.status(201).json({ msg: "Usuario Creado", usuario });
    }else{
      res.status(400).json({msg:'Error al crear el usuario ver consola'})
    }
  } catch (error) {
    console.log(error);
    res.send("no se pudo crear el usuario");
  }
};

/* Inicio de Sesión Usuario */
/* comparamos las contraseñas para el ingreso de los usuarios */
const InicioSesionUsuario = async (req, res)=>{
  try {
    /* traemos los datos del body  */
    const usuario = await serviceUsuarios.inisioSesion(req.body)
    if(usuario === 400){
      res.status(400).json({msg:'Usuario y contraseña incorrecto'})
    }else{
      res.status(200).json({msg:'Usuario logueado'})
    }
  } catch (error) {
    console.log(error)
  }
}



/* Traer Usuarios */
const mostrarUsuarios = async (req, res) => {
  try {
   const usuarios = await  serviceUsuarios.todosLosUsuarios()
  res.status(200).json(usuarios)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Problema al traer los usuarios" });
  }
};

/* Traer un usuario */
const mostrarUsuario = async (req, res) => {
  try {
    const muestroUnUsuario = await serviceUsuarios.obtenerUnUsuario(req.params.idUsuario)
      res.status(200).json(muestroUnUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Problema al traer el usuario" });
  }
};

/* Borrar Usuario - Baja fisica */
const eliminarUsuarioFisico = async (req, res)=>{
  try {
    const respuesta  = await  serviceUsuarios.bajaUsuario(req.params.idUsuario)
    if(respuesta.status === 200 ){
      res.status(200).json({msg:'Usuario eliminado con éxito'})
    } else {
      res.status(400).json({msg:'error al eliminar usuario, ver consola'})
    }
  } catch (error) {
    console.log(error)
  }
}
/* Eliminar usuario - Lógica */
const actualizarUsuarioLogico = async (req, res)=>{
  try {
    const usuario = await  serviceUsuarios.actualizoUsuarioLogica(req.params.idUsuario)
   
    res.status(200).json({msg: usuario})
  } catch (error) {
    console.log(error)
  }
}

/* exportar los modulos  */
module.exports = {
  crearUsuario,
  mostrarUsuarios,
  mostrarUsuario,
  eliminarUsuarioFisico,
  actualizarUsuarioLogico,
  InicioSesionUsuario
};
