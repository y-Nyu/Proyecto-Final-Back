const pending = (req, res) => {
  console.log(req.query);
  // res.redirect("url del front")
  res.send("El pago está siendo procesado.");
};

module.exports = pending;
