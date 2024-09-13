const {Router} = require('express')
const { crearUsuario, mostrarUsuarios } = require('../controllers/usuarios.controllers')
const router = Router()

/* Crear */
router.post('/', crearUsuario)
router.get('/', mostrarUsuarios)


module.exports = router