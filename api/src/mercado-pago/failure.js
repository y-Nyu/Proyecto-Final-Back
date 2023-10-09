const sendPaymentFailure = require("../controllers/Mails/sendPaymentFailure");

const failure = (req, res) => {
  sendPaymentFailure("./src/templates/PagoFailure.html").catch((err) =>
    console.error("ERROR SENDING EMAIL || " + err.message)
  );

  res.redirect("https://pf-deploy-gamma.vercel.app");
};
module.exports = failure;
