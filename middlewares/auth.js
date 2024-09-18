/* middleware personalizado */
const jwt = require('jsonwebtoken')



/* si es una funcion, le agregamos next , que si lo agreggamos pasa el controlador  */
module.exports = (role) => (req, res, next)=>{
  /*podemos solo exportar una funcion anonima con este metodo */
  try {
    /* headers - body - query - params  */
    const token = (req.header('auth'))
    /* chequeamos si hay token */
    if(!token){
      return res.status(409).json({msg:'Token incorrecto'})
    }

    
    /* verificamos el token  */
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    /* recibimos pro parametros el rol y oreguntamos si es admin */
    

   if(role === verify.role){
    return next()
   }else{
    return res.status(401).json({msg:'No tenes acceso'})
   }
  } catch (error) {
    console.log(error)
  }
}