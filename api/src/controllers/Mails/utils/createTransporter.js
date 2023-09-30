const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const oauthClient = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauthClient.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await new Promise((res, rej) => {
        oauthClient.getAccessToken((err, token) => {
            if (err) {
              console.log("*ERR: ", err)
              rej();
            }
            res(token);
        })
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.MAIL_ADDR,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
        },
    });
    
    return transporter;


}

module.exports = createTransporter;