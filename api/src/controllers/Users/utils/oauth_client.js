require("dotenv").config();

const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, OAUTH_REDIRECT } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  OAUTH_REDIRECT
);

module.exports = {
  oauth2Client,
};
