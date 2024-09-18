/* traigo el servidor  - usar la mayuscula ya que es una clase o modelo */
const Server = require('./server/config')
/* nueva instancia del servido creado */
const server = new Server()
/* lo ejecutamos */
server.listen()
