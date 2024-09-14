const usuarios = [
  {
    id:1,
    nombreUsuario: "Nico2024",
    emailDelUsuario: "nicoUsuario@gmail.com",
    constrasenia: "123456789",
  },
];


/* crear usuario  */
const nuevoUsuario = (body)=>{
  try {
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
    return 201
  } catch (error) {
    console.log(error)
  }
}

/* mostrar todos los usuarios  */
const todosLosUsuarios = ()=>{
  try {
    return usuarios
  } catch (error) {
    console.log(error)
  }
}

/* obtener un usuarios services */
const obtenerUnUsuario = (idUsuario)=>{
  try {
    const usuario = usuarios.find((user)=> user.id === idUsuario)
    /* retornamos el usuario encontrado */
    return usuario
  } catch (error) {
    console.log(error)
  }
}

/* baja del usuarioCompleto */
const bajaUsuario = (idUsuario)=>{
  try {
     /* splice - recibe posicion y cantidad */
     const posicionUsuario = usuarios.findIndex((usuario)=>usuario.id === idUsuario)
     usuarios.splice(posicionUsuario, 1)
     return 200 
  } catch (error) {
   console.log(error) 
  }
}

/* actualizacion del usuario - baja o no  */
const actualizoUsuarioLogica = (idUsuario)=>{
  const posicionUsuario = usuarios.findIndex((usuario)=> usuario.id === idUsuario)

  usuarios[posicionUsuario].baja = !usuarios[posicionUsuario].baja

  const mensaje = usuarios[posicionUsuario].baja ? 'Usuario bloquedo' : 'Usuario Activo'
  return mensaje
}

/* exportamos los modulos para los controlers */
module.exports = {
  nuevoUsuario, 
  todosLosUsuarios, 
  obtenerUnUsuario,
  bajaUsuario,
  actualizoUsuarioLogica
}