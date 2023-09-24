const { Router } = require("express");
const {
  usersGet,
  usersEdit,
  userGetById,
  usersCreate,
  userDelete,
} = require("../handlers/Users/userHandler");

const router = Router();
////////////////////////////////////////

router.get("/users", usersGet);
router.put("/users/:id", usersEdit);
router.get("/users/:id", userGetById);
router.post("/users", usersCreate);
router.delete("/users/:id", userDelete);

module.exports = router;
