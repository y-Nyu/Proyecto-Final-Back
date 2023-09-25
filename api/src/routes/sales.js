const router = require("express").Router();
const {createSale, getAllSales, getSaleById} = require("../handlers/Sales/saleHandler");

router.get("/success", (req, res) => res.status(200).send("Payment was successful"));
router.get("/pending", (req, res) => res.status(200).send("Pending..."));


router.get("/get-sales", getAllSales);
router.get("/:id", getSaleById);
router.post("/sale", createSale);



module.exports = router;