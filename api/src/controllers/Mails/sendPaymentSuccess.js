const createTransporter = require("./utils/createTransporter");


const sendPaymentSuccess = async (HTMLpath) => {
    const transporter = await createTransporter();

    const options = {
        from: process.env.MAIL_ADDR,
        to: userMail,
        subject: "Pago realizado exitosamente",
        html: fs.readFileSync(HTMLpath)
    }


    transporter.sendMail(options)
        
}

module.exports = sendPaymentSuccess;