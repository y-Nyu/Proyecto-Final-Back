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

/////////////////////////////////////////

module.exports = router;
