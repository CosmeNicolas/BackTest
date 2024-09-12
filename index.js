/* armamos el servidor con express  */
const express = require('express')
/* ejecutamos express */
const app =express()
/* llamamos al path para indicar ruta del archivo estatico */
const path = require('path')


const PORT = 3001;
/* middleware - se ejecutan antes de la ruta  */
app.use(express.json())
/* archivos estaticos */
app.use(express.static(path.join(__dirname,'public')))
console.log(express.static(__dirname,'public'))

let productos = [
    {
        id:1,
        nombre:'celurar',
        precio:10000
    },
    {
        id:2,
        nombre:'tablet',
        precio:12000
    }
]
/* Verbos: GET - PSOT - PUT - DELETE , siempre hay una req, y res
endpoint , ruta, middleware , controlador
ej: app.get('/', middleware, ()=>{})
*/

/* GET - obtener */
app.get("/api/productos", (req, res) => {
  /* Request - Es la petición que el front nos envia al back */
  /* Res - Es la respuesta del back que envia al front */
  /* response - status - formato ({es la estructura de respuesta})*/
  /* hacemos ambas peticiones todos y id en una sola peticion */
  try {
    const id = Number(req.query.id);
    if (id) {
      const producto = productos.find((prod) => prod.id === id);
      res.status(200).json(producto);
    } else {
      res.status(200).json({ msg: "Productos encontrados", productos });
    }
  } catch (error) {
    /* response - status - formato */
    res.status(500).json({ msg: "Productos no encontrados",error 
  })}
});

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

/* POST - Crear */

app.post('/api/productos',(req , res)=>{
    /* creamos - info x body */
    try {
        /* const datProducto = req.body */
        /* const { nombre, precio} = req.body */
        /* spread operator */
        const nuevoProducto = {
            id: productos[productos.length-1].id+1,
            ...req.body
        }
        productos.push(nuevoProducto)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(500).json({ msg: "Productos no encontrados",error 
        })
    }
})

/* PUT - editar */
app.put('/api/productos/:id',(req, res)=>{
    try {
        const id  = Number(req.params.id)
        const posicionProductoEnArray = productos.findIndex((producto)=> producto.id === id)

        const productoEditado = {
            id,
            ...req.body
        }

       productos[posicionProductoEnArray] = productoEditado
        
        res.status(200).json(productos[posicionProductoEnArray])

    } catch (error) {
        res.status(500).json({ msg: "Productos no actualizado",error 
        })
    }
})

/* DELETE */
app.delete('/api/productos/:id',(req, res)=>{
    try {
        const id = Number(req.params.id)
        const productoNoBorrado = productos.filter((producto)=> producto.id !== id)

        productos = productoNoBorrado
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ msg: "Error al borrar",error })
    }
})
/* escuchamos el puerto  */
app.listen(PORT,()=>{
    console.log('server ok', 3001)
})