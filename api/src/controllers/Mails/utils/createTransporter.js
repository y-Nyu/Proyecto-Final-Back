require("dotenv").config();
const nodemailer = require("nodemailer");

const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADDR,
      pass: process.env.MAIL_PASS,
    },
  });

  return transporter;
};

module.exports = createTransporter;
