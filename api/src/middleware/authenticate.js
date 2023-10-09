require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const nonSecure = require("./no_secure");

function authenticate(req, res, next) {
  try {
    // If current path does not need authentication we keep going
    // This makes it so user doesn't need to be logged in to
    // enter the login or register page
    console.log(`aca esta el problema ${req.path}`);
    if (!nonSecure.includes(req.path)) {
      const token = req.headers.authorization?.split(" ")[1];
      console.log("TOKEN: " + JSON.stringify(req.headers));
      if (!token) {
        console.log("AUTHENTICATION no token");
        return res.status(400).send("Unexpected token");
      }

      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified.id;
    }

    console.log("AUTHENTICATION");
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = authenticate;
