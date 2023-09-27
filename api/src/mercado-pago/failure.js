module.exports = (req, res) => {
    console.log(req.query);
    // res.redirect("url del front")
    res.send("El pago no se ha logrado realizar.")
}
