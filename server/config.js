/* clases - plantillas - server - configuracion a partir de una clase  */

/* llamamos a express  */
const express = require("express");
const path = require("path");
const cors = require("cors");

class Server {
  /* asignamos los atributos, metodos, parametros, etc */
  constructor() {
    /* this, hace referencia al objeto */
    this.app = express();
    this.port = process.env.PORT || 8080;

    /* invocamos los middlewares - rutas en el constructir */
    this.middleware();
    this.routes();
  }

  /* Traer Middlewares */
  middleware() {
    /* middleware - se ejecutan antes de la ruta  */
    this.app.use(express.json());
    /* archivos estaticos */
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(cors());
  }
  /* aca van todas las rutas del servidor */
  routes() {
    this.app.use("/api/productos", require("../routes/productos.routes"));
    this.app.use("/api/usuarios", require("../routes/usuario.routes"))
  }
  listen() {
    /* escuchamos el puerto  */
    this.app.listen(this.port, () => {
      console.log("server ok", 3001);
    });
  }
}
/*  exportamos el server - metodo , funciones, clases, estc */
/* un solo archivo  */
module.exports = Server;

/* export multiples archivos */
/* module.exports = {

} */
