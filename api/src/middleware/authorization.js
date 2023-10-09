const prisma = require("../db");
const { ADMIN_PAGES } = require("../utils/utils");
const authorizationPaths = require("./no_authorization");

async function authorization(req, res, next) {
  try {
    if (authorizationPaths.includes(req.path)) {
      const token = req.headers.authorization?.split(" ")[1];

      // This obtains token payload
      const payload = token.split(".")[1];

      const email = JSON.parse(Buffer.from(payload, "base64").toString()).email;

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      // We check user is in the data base
      if (!user) throw Error("No such user in the database");

      // If everything went well, then we check privileges
      if (ADMIN_PAGES.includes(req.path)) {
        if (user.rol !== "ADMIN") {
          return res.status(401).json({ message: "Not sufficient privileges" });
        }
      }
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = authorization;
