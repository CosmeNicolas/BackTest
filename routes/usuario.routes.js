const {Router} = require('express')
const { crearUsuario, mostrarUsuarios,mostrarUsuario,eliminarUsuarioFisico, actualizarUsuarioLogico, InicioSesionUsuario } = require('../controllers/usuarios.controllers')
const router = Router()

/* Crear */
router.post('/', crearUsuario)
router.post('/login', InicioSesionUsuario)
router.get('/', mostrarUsuarios)
router.get('/:idUsuario', mostrarUsuario)
router.delete('/:idUsuario', eliminarUsuarioFisico)
router.put('/:idUsuario', actualizarUsuarioLogico)


module.exports = router