const express = require("express");
require("dotenv").config();
const app = express();

const authenticate = require("./middleware/authenticate");
const authorizate = require("./middleware/authorization");


app.use(express.json());
app.use(authenticate);
app.use(authorizate);


module.exports = app;