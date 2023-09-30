const createTransporter = require("./utils/createTransporter")
const fs = require("fs");

const sendWelcome = async (userMail, HTMLpath) => {
    const options = {
        from: process.env.MAIL_ADDR,
        to: userMail,
        subject: "Test",
        html: fs.readFileSync(HTMLpath)
    }
    
    const transporter = await createTransporter();
    await transporter.sendMail(options);

}


module.exports = sendWelcome;