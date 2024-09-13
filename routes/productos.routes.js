/* instanciamos las rutas de  express */
/* const {Router} = require('express') */
const express = require("express");
const {
  obtenerProductos,
  crearProducto,
  actualizarProdcutoxID,
  eliminarProducto,
} = require("../controllers/producto.controllers");
const router = express.Router();

/* GET - obtener */
router.get("/", obtenerProductos);

/* POST - Crear */

router.post("/", crearProducto);
/* Verbos: GET - PSOT - PUT - DELETE , siempre hay una req, y res
endpoint , ruta, middleware , controlador
ej: app.get('/', middleware, ()=>{})
*/
/* PUT - editar */
router.put("/:id", actualizarProdcutoxID);

/* DELETE */
router.delete("/:id", eliminarProducto);

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
