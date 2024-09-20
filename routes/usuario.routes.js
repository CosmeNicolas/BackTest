const { Router } = require("express");
const {
  crearUsuario,
  mostrarUsuarios,
  mostrarUsuario,
  eliminarUsuarioFisico,
  actualizarUsuarioLogico,
  InicioSesionUsuario,
} = require("../controllers/usuarios.controllers");
const router = Router();
/* Express - validator */
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

/* Crear */
router.post(
  "/",
  [
    /* llamamos el check para chequear los datos de a ruta */
    check("nombreUsuario", "Campo Usuario esta vacio").not().isEmpty(),
    check("nombreUsuario", "min:5 caracteres y max: 40 caracteres").isLength({
      min: 5,
      max: 40,
    }),
    check("contrasenia", "Campo Contraseña esta vacios").not().isEmpty(),
    check("contrasenia", "min:8 caracteres y max: 50 caracteres").isLength({
      min: 8,
      max: 50,
    }),
    /* si es un email  */
    /* check('nombreUsuario', 'Formato Incorrecto: tiene que ser un email').isEmail() */
  ],
  crearUsuario
);

/* Loguear Usuario */
router.post(
  "/login",
  check("nombreUsuario", "Campo Usuario esta vacio").not().isEmpty(),
  check("contrasenia", "Campo Contraseña esta vacios").not().isEmpty(),
  InicioSesionUsuario
);
router.get("/", auth("admin"), mostrarUsuarios);
router.get(
  "/:idUsuario",
  check("idUsuario", "Formato Id incorrecto").isMongoId(),
  auth("admin"),
  mostrarUsuario
);
router.delete("/:idUsuario", auth("admin"), eliminarUsuarioFisico);
router.put("/:idUsuario", auth("admin"), actualizarUsuarioLogico);

module.exports = router;
