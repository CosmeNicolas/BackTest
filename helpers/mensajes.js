/* mensajes de palntilla nodemailer */
/* traemos el transporter  */
const transporter = require('./nodeMailer')
// async..await is not allowed in global scope, must use a wrapper
const registroUsuario = async (nombre, apellido, usuario)=> {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Bienvenido a nuestra pagina 👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `nicomas7590@gmail.com`, // list of receivers
    subject: "Bienvenido ✔", // Subject line
   /* cambiamos por backtics para aporvechar el html */
    html: `
      <div><h2>Bienvenido 🤓</h2></div>
    ` // html body
  });

  console.log("Message sent: %s", info.messageId);
 
}
/* pagos */
const pagosUsusario = async (nombre, apellido, usuario)=> {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `gracias por haber comprado en nuestra pagina 👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `nicomas7590@gmail.com`, // list of receivers
    subject: "Pagado ✔", // Subject line
   /* cambiamos por backtics para aporvechar el html */
    html: `
      <div><h2>Pagado 🤓</h2></div>
    ` // html body
  });

  console.log("Message sent: %s", info.messageId);
 
}

/* recupero contraseña */
/* pagos */
const recuperoContrasenia = async (nombre, apellido, usuario)=> {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `recuperar contraseña 👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `nicomas7590@gmail.com`, // list of receivers
    subject: "Password ✔", // Subject line
   /* cambiamos por backtics para aporvechar el html */
    html: `
      <div><h2>recuperar contraseña 🤓</h2></div>
    ` // html body
  });

  console.log("Message sent: %s", info.messageId);
 
}

module.exports = {
  registroUsuario,
  pagosUsusario,
  recuperoContrasenia
}