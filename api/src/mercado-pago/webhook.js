//Si la respuesta de MP es success, se ejecutaria el siguiente controlador. Y el mismo lo que hace es redireccionar todo a la url de nuestro cliente.
const webhook = (req, res) => {
  console.log(req.query);
  // res.redirect("url del front")
  res.send("Procesando pago...");
};
module.exports = webhook;
