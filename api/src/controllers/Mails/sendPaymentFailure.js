const createTransporter = require("./utils/createTransporter");

const sendPaymentFailure = async (HTMLpath) => {
   
    const transporter = await createTransporter();
    
    const options = {
        from: process.env.MAIL_ADDR, 
        to: userMail,
        subject: "Fallo en el pago",
        html: fs.readFileSync(HTMLpath)
    }
    
    
    transporter.sendMail(options)
            
}

module.exports = sendPaymentFailure;