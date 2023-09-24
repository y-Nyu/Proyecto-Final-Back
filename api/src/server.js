const express = require("express");
require("dotenv").config();
const app = express();

const authenticate = require("./middleware/authenticate");
const authorizate = require("./middleware/authorization");
const salesRouter = require("./routes/sales");


app.use(express.json());
//app.use(authenticate);
//app.use(authorizate);
app.use("/sales", salesRouter);


module.exports = app;