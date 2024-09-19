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
} = require("../controllers/producto.controllers");
const { check } = require("express-validator");
const auth = require('../middlewares/auth');
const multer = require("../middlewares/multer");

const router = express.Router();

/* GET - obtener */
router.get("/", obtenerProductos);

/* GET - ObtenerProducot por busqueda */
router.get('/buscar', buscadorProducto)

/* POST - Crear */
router.post("/", [
  check('nombre','cammpo Nombre Vacio').not().isEmpty(),
  check('precio', 'campo Precio vacio').not().isEmpty(),
  check('descripcion', 'campo Descripcion vacio').not().isEmpty(),
]/* ,auth('admin') */,crearProducto);
/* Verbos: GET - PSOT - PUT - DELETE , siempre hay una req, y res

/* POST _ IMAGEN */
router.post('/agregarImagen/:id',multer.single('imagen'),agregarImagenProductoPorId)
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
router.delete("/:id",auth('admin'), eliminarProducto);

/* exportar las rutas  */
module.exports = router;

/* GET - id */
/* app.get('/api/productos/:id',(req, res)=>{ */
/* req - body - params - query */
/* params - parametro */
/* /api/productos/:id - parametro */
/* query - dato - ?
 req.query.id 
 req.query.nombre
 */
/*  const id = Number(req.params.id)
  const producto = productos.find((prod)=> prod.id === id )
  res.status(200).json(producto) */
/*     }) */
