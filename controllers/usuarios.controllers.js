
const usuarios = [
  {
    id:1,
    nombreUsuario:"Nico2024",
    emailDelUsuario:'nicoUsuario@gmail.com',
    constrasenia : '123456789'
  }
]

/* crear usuario */
const crearUsuario = (req, res)=>{
  try {
    const body = req.body
    const emailExiste = usuarios.find((usuario)=>usuario.emailDelUsuario === body.emailDelUsuario)
    const usuarioExiste = usuarios.find((usuario)=> usuario.nombreUsuario === body.nombreUsuario)
    if (usuarioExiste) {
    return res.status(400).json({msg:'Usuario no disponible'})
    }
    if (emailExiste) {
      return res.status(400).json({msg:'correo no disponible'})
    }
    usuarios.push(body)
    res.status(201).json({msg:'Usuario Creado'})
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el usuario", error });
  }
}

/* Traer Usuarios */
const mostrarUsuarios = async (req, res)=>{
  try {
    res.status(200).json({msg:'usuarios encontrados',usuarios})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:'Problema al traer los usuarios'})
  }
}

/* exportar los modulos  */
module.exports = {
  crearUsuario,
  mostrarUsuarios
}