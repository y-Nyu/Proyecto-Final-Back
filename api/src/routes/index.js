const { Router } = require("express");
const {
  usersGet,
  usersEdit,
  userGetById,
  usersCreate,
  userDelete,
} = require("../handlers/Users/userHandler");
const {
  createSale,
  getAllSales,
  getSaleById,
} = require("../handlers/Sales/saleHandler");
const {
  createNewProduct,
  deleteAProduct,
  editAProduct,
  getAProduct,
  getProductId,
} = require("../handlers/Products/ProductHandler");

const router = Router();

//////////////////////////////////////// User routes
router.get("/users", usersGet);
router.put("/users/:id", usersEdit);
router.get("/users/:id", userGetById);
router.post("/users", usersCreate);
router.delete("/users/:id", userDelete);

///////////////////////////////////////// Sales routes
router.get("/success", (req, res) =>
  res.status(200).send("Payment was successful")
);
router.get("/pending", (req, res) => res.status(200).send("Pending..."));

router.get("/get-sales", getAllSales);
router.get("/:id", getSaleById);
router.post("/sale", createSale);

///////////////////////////////////////// Products routes
router.post("/product", createNewProduct);
router.delete("/product/:id", deleteAProduct);
router.put("/product/:id", editAProduct);
router.get("/product", getAProduct);
router.get("/product/:id", getProductId);
/////////////////////////////////////////

module.exports = router;
