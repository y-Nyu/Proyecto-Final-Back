const router = require("express").Router();
const {createSale, getAllSales, getSaleById} = require("../handlers/Sales/saleHandler");

router.get("/get-sales", getAllSales);
router.get("/:id", getSaleById);
router.post("/sale", createSale);



module.exports = router;