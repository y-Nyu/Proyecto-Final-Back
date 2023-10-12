require("dotenv").config();
const prisma = require("../../db");
const { oauth2Client } = require("./utils/oauth_client");

const axios = require("axios");

const loginUserGoogleCred = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // We retrieve user email and check if user is registered
  // If not, prompt the user to register with their gmail
  const { email, name } = (
    await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
        tokens.access_token
    )
  ).data;

  let user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      name,
    },
    create: {
      email,
      name,
      google: true,
      celular: "0000000000",
    },
  });

  if (!user) throw Error("Google account not registered in the database!");

  return user;
};

module.exports = loginUserGoogleCred;
