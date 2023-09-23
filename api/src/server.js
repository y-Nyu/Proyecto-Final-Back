const express = require("express");

require("dotenv").config();

const app = express();

const authenticate = require("./middleware/authenticate");

app.use(express.json());
app.use(authenticate);


module.exports = app;