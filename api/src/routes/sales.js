const router = require("express").Router();
const {createSale} = require("../handlers/Sales/saleHandler");

router.post("/sale", createSale);

module.exports = router;