const { Router } = require("express");
const {
  usersGet,
  usersEdit,
  userGetById,
  usersCreate,
  userDelete,
  userLogin,
  userGoogleLogin,
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

const {
  getCategory,
  categoryCreate,
} = require("../handlers/Category/categoryHandler");

const createOrder = require("../mercado-pago/createOrder");
const success = require("../mercado-pago/success");
const webhook = require("../mercado-pago/webhook");
const pending = require("../mercado-pago/pending");
const failure = require("../mercado-pago/failure");

const router = Router();

//////////////////////////////////////// Mercadopago routes
//Crea la orden de pago:
router.post("/create-order", createOrder);

//Controlador redirigir al usuario si el pago sale bien.
router.get("/success", success);

//Ruta.post por si el usuario cierra MP sin volver a nuestra app.
router.post("/webhook", webhook);

//Controlador pending. El pago está en proceso.
router.get("/pending", pending);

//Controlador failure debido a una falla en el pago.
router.get("/failure", failure);

//////////////////////////////////////// User routes
router.get("/users", usersGet);
router.put("/users/:id", usersEdit);
router.get("/users/:id", userGetById);
router.post("/users", usersCreate);
router.delete("/users/:id", userDelete);
router.post("/login", userLogin);
router.post("/login-google", userGoogleLogin);

///////////////////////////////////////// Sales routes
router.get("/sale", getAllSales);
router.get("/sale/:id", getSaleById);
router.post("/sale", createSale);

///////////////////////////////////////// Products routes
router.post("/product", createNewProduct);
router.delete("/product/:id", deleteAProduct);
router.put("/product/:id", editAProduct);
router.get("/product", getAProduct);
router.get("/product/:id", getProductId);

///////////////////////////////////////// Categorys routes
router.get("/category", getCategory);
router.post("/category", categoryCreate);
/////////////////////////////////////////

module.exports = router;
