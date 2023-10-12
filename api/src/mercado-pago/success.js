// La información que envía MP. y esta información la envía por QUERY. Nos damos cuenta cuando miramos el init_point del postman: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1169280609-5a97b3ae-c952-4afd-9e7b-e6bb71784e1e"

const sendPaymentSuccess = require("../controllers/Mails/sendPaymentSuccess");

//Si la respuesta de MP es success, se ejecutaria el siguiente controlador. Y el mismo lo que hace es redireccionar todo a la url de nuestro cliente.
const succes = async (req, res) => {
  sendPaymentSuccess("./src/templates/PagoSuccess.html").catch((err) =>
    console.error("ERROR SENDING EMAIL || " + err.message)
  );

  res.redirect("https://pf-eight-kappa.vercel.app/#/success");
};
module.exports = succes;
