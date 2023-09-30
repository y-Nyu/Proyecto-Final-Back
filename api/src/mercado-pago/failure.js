const sendPaymentFailure = require("../controllers/Mails/sendPaymentFailure");

const failure = (req, res) => {
  console.log(req.query);
  sendPaymentFailure("./src/templates/PagoFailure.html").catch((err) =>
    console.error("ERROR SENDING EMAIL || " + err.message)
  );

  // res.redirect("url del front")
  res.send("El pago no se ha logrado realizar.");
};
module.exports = failure;
