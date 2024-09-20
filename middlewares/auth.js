/* middleware personalizado */
const jwt = require('jsonwebtoken')



/* si es una funcion, le agregamos next , que si lo agreggamos pasa el controlador  */
module.exports = (role) => (req, res, next)=>{
  /* headers - body - query - params  */
  const token = (req.header('auth'))
  /* chequeamos si hay token */
  if(!token){
    return res.status(409).json({msg:'Token incorrecto'})
  }
  /*podemos solo exportar una funcion anonima con este metodo */
  try {

    
    /* verificamos el token  */
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    /* recibimos pro parametros el rol y oreguntamos si es admin */
    

   if(role === verify.role){
    /* para usar la propiedad del idUsuario en el token le creamos una nueva propieda en este caso que esta en el req*/
    req.id = verify._id
    /* salvamos el dato del id en la req */
    return next()
   }else{
    return res.status(401).json({msg:'No tenes acceso'})
   }
  } catch (error) {
    if(error.name === 'JsonWebTokenError'){
      res.status(500).json({msg:'token incorrecto'})
    }
    console.log(error)
  }
}