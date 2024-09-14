const usuarios = [
  {
    id:1,
    nombreUsuario: "Nico2024",
    emailDelUsuario: "nicoUsuario@gmail.com",
    constrasenia: "123456789",
  },
];

/* crear usuario */
const crearUsuario = (req, res) => {
  try {
    const body = req.body;
    const emailExiste = usuarios.find(
      (usuario) => usuario.emailDelUsuario === body.emailDelUsuario
    );
    const usuarioExiste = usuarios.find(
      (usuario) => usuario.nombreUsuario === body.nombreUsuario
    );
    if (usuarioExiste) {
      return res.status(400).json({ msg: "Usuario no disponible" });
    }
    if (emailExiste) {
      return res.status(400).json({ msg: "correo no disponible" });
    }
    const id = crypto.randomUUID();
    usuarios.push({ id,baja: false, ...body });
    /* ... el spread copia el objeto y le agregamos el id */
    res.status(201).json({ msg: "Usuario Creado" });
  } catch (error) {
    console.log(error);
    res.send("no se pudo crear el usuario");
  }
};

/* Traer Usuarios */
const mostrarUsuarios =  (req, res) => {
  try {
    res.status(200).json({ msg: "usuarios encontrados", usuarios });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Problema al traer los usuarios" });
  }
};

/* Traer un usuario */
const mostrarUsuario = (req, res) => {
  try {
    const id = req.params.idUsuario
    /* lo parseamos a numero ya que son datos que llegan por string */
    const usuario = usuarios.find((user)=> user.idUsuario === id)

    /* filtramos el id */
    if(!usuario) {
      res.status(400).json({msg:'Usuario no encontrado'})
    }else{
      res.status(200).json(usuario);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Problema al traer el usuario" });
  }
};

/* Borrar Usuario - Baja fisica */
const eliminarUsuarioFisico = (req, res)=>{
  try {
    const id=req.params.idUsuario
    /* splice - recibe posicion y cantidad */
    const posicionUsuario = usuarios.findIndex((usuario)=>usuario.id === id)
    console.log(posicionUsuario)
    usuarios.splice(posicionUsuario, 1)
    res.status(200).json(usuarios)
  } catch (error) {
    console.log(error)
  }
}
/* Eliminar usuario - Lógica */
const actualizarUsuarioLogico = (req, res)=>{
  try {
    const id=req.params.idUsuario
    const posicionUsuario = usuarios.findIndex((usuario)=> usuario.id === id)

    usuarios[posicionUsuario].baja = true
    res.status(200).json({msg:'Usuario bloqueado'})
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
