const serviceUsuarios = require('../services/usuarios.services')

/* servicios  */
/* crear usuario */
const crearUsuario = (req, res) => {
  try {
    const usuario = serviceUsuarios.nuevoUsuario(req.body)
    res.status(201).json({ msg: "Usuario Creado", usuario });
  } catch (error) {
    console.log(error);
    res.send("no se pudo crear el usuario");
  }
};

/* Traer Usuarios */
const mostrarUsuarios =  (req, res) => {
  try {
   const usuarios = serviceUsuarios.todosLosUsuarios()
  res.status(200).json(usuarios)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Problema al traer los usuarios" });
  }
};

/* Traer un usuario */
const mostrarUsuario = (req, res) => {
  try {
    const muestroUnUsuario = serviceUsuarios.obtenerUnUsuario(req.params.idUsuario)
      res.status(200).json(muestroUnUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Problema al traer el usuario" });
  }
};

/* Borrar Usuario - Baja fisica */
const eliminarUsuarioFisico = (req, res)=>{
  try {
    const respuesta  = serviceUsuarios.bajaUsuario(req.params.idUsuario)
    if(respuesta.status === 200 ){
      res.status(200).json({msg:'Usuario eliminado con éxito'})
    }
  } catch (error) {
    console.log(error)
  }
}
/* Eliminar usuario - Lógica */
const actualizarUsuarioLogico = (req, res)=>{
  try {
    const respuesta = serviceUsuarios.actualizoUsuarioLogica(req.params.idUsuario)
   
    res.status(200).json({msg: respuesta})
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
  actualizarUsuarioLogico
};
