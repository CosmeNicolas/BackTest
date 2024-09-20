/* instanciamos las rutas de  express */
/* const {Router} = require('express') */
const express = require("express");
const {
  obtenerProductos,
  crearProducto,
  actualizarProdcutoxID,
  eliminarProducto,
  agregarImagenProductoPorId,
  buscadorProducto,
  agregarProductoAlCarrito,
  borrarProductoCarrito,
  agregarProductoFavorito,
  borrarProductoFavorito,
} = require("../controllers/producto.controllers");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
const router = express.Router();

/* GET - obtener */
router.get("/", obtenerProductos);

/* GET - ObtenerProducot por busqueda */
router.get("/buscar", buscadorProducto);

/* POST - Crear */
router.post(
  "/",
  [
    check("nombre", "cammpo Nombre Vacio").not().isEmpty(),
    check("precio", "campo Precio vacio").not().isEmpty(),
    check("descripcion", "campo Descripcion vacio").not().isEmpty(),
  ] /* ,auth('admin') */,
  crearProducto
);
/* Verbos: GET - PSOT - PUT - DELETE , siempre hay una req, y res

/* RUTA PARA ELiminar producto del CARRITO  */
router.post(
  "/quitarProductoCarrito/:id",
  auth("usuario"),
  borrarProductoCarrito
);
/* RUTA PARA ELiminar producto del CARRITO  */

/* RUTA PARA AGREGAR AL CARRITO  - lo puden hacer los usuarios*/
router.post(
  "/agregarProductoCarrito/:id",
  auth("usuario"),
  agregarProductoAlCarrito
);
/* RUTA PARA AGREGGAR AL CARRITO */

/* RUTAS FAVORITOS - AGREGAR*/
router.post(
  "/agregarProductoFavorito/:id",
  auth("usuario"),
  agregarProductoFavorito
);
/* RUTAS FAVORITOS - AGREGAR*/
/* RUTAS FAVORITOS  - QUITAR*/
router.post(
  "/quitarProductoFavorito/:id",
  auth("usuario"),
  borrarProductoFavorito
);
/* RUTAS FAVORITOS  - QUITAR*/
/* POST _ IMAGEN */
router.post(
  "/agregarImagen/:id",
  multer.single("imagen"),
  agregarImagenProductoPorId
);
/* POST _ IMAGEN */

/* PUT - editar */
router.put(
  "/:id",
  [
    check("nombre", "cammpo Nombre Vacio").not().isEmpty(),
    check("precio", "campo Precio vacio").not().isEmpty(),
    check("descripcion", "campo Descripcion vacio").not().isEmpty(),
  ],
  auth("admin"),
  actualizarProdcutoxID
);

/* DELETE */
router.delete("/:id", auth("admin"), eliminarProducto);

/* exportar las rutas  */
module.exports = router;
