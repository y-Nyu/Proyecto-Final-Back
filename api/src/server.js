const routes = require("./routes/index");
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const authenticate = require("./middleware/authenticate");
const authorizate = require("./middleware/authorization");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/", routes);

// Auth is disabled for now to test the app easily
app.use(authenticate);
app.use(authorizate);


module.exports = app;
