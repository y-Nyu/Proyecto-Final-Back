const express = require("express");
const app = express();
const morgan = require("morgan");

require("dotenv").config();

const authenticate = require("./middleware/authenticate");
const authorizate = require("./middleware/authorization");
const salesRouter = require("./routes/sales");


app.use(morgan("dev"));
app.use(express.json());

// Auth is disabled for now to test the app easily
//app.use(authenticate);
//app.use(authorizate);
app.use("/sales", salesRouter);


module.exports = app;