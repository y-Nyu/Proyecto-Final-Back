require("dotenv").config();
const { CLIENT_ID } = process.env;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);
const prisma = require("../../db");

const loginUserGoogle = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const { name, email } = ticket.getPayload();

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
    },
  });

  if (!user) throw Error("Such email is not registered...");

  return user;
};

module.exports = loginUserGoogle;
