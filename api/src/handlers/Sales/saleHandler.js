const prisma = require("../../db");
const createSaleController = require("../../controllers/Sales/createSale");
const getAllSalesController = require("../../controllers/Sales/getAllSales");
const getSaleByIdController = require("../../controllers/Sales/getSaleById");

const createSale = (req, res) => {
  const { iduser, idproduct, quantity } = req.body;

  createSaleController(+iduser, +idproduct, +quantity)
    .then((sale) => {
      res.status(200).json({ ...sale });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

const getAllSales = (req, res) => {
  getAllSalesController()
    .then((sales) => res.status(200).json({ sales }))
    .catch((err) => res.status(404).json({ error: err.message }));
};

const getSaleById = (req, res) => {
  const { id } = req.params;

  getSaleByIdController(id)
    .then((sale) => res.status(200).json({ sale }))
    .catch((err) => res.status(404).json({ error: err.message }));
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
