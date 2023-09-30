const createTransporter = require("./utils/createTransporter")
const fs = require("fs");

const sendLoginNotif = async (userMail, HTMLpath) => {
    let time = new Date();
    const options = {
        from: process.env.MAIL_ADDR,
        to: userMail,
        subject: "New loggin to Patitas Felices on this account",
        html: fs.readFileSync(HTMLpath)
    }
    
    const transporter = await createTransporter();
    await transporter.sendMail(options);
}

module.exports = sendLoginNotif