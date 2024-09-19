const multer = require("multer");
/* exportamos el modulo y la funcion 
con module.exports */
/* traemos path - para indicar la ruta */
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  /* recibe req, file, callback */
  fileFilter: (req, file, cb) => {
    /* extname - nombre la ruta original */
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      return cb(new Error("Formato incorrecto"), false);
    }
    /* el error tiene q ser null y el aceptefile debe ser true */
    cb(null, true);
  },
});


