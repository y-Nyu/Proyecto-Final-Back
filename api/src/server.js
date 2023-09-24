const routes = require("./routes/index");
const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/", routes);

module.exports = app;
