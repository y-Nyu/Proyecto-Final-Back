const createTransporter = require("./utils/createTransporter");
require("dotenv").config();

const sendPaymentSuccess = async (HTMLpath) => {
  const transporter = await createTransporter();

  const options = {
    from: process.env.MAIL_ADDR,
    to: userMail,
    subject: "Pago realizado exitosamente",
    html: `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Confirmación de Pago - Patitas Felices</title>
        <style>
            body {
                background-color: #f2f2f2;
                font-family: Arial, sans-serif;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
            }
    
            table, th, td {
                border: 1px solid #cccccc;
            }
    
            th, td {
                padding: 10px;
            }
    
            th {
                background-color: #4b0082; /* Violeta oscuro */
                color: #ffffff;
            }
    
            td {
                background-color: #87ceeb; /* Azul cielo */
            }
    
            h1 {
                color: #4b0082; /* Violeta oscuro */
            }
        </style>
    </head>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="20">
                        <tr>
                            <td align="center">
                                <img src="https://tu-sitio.com/logo.png" alt="Logo Patitas Felices" width="150">
                                <h1>Confirmación de Pago</h1>
                                <p>¡Gracias por tu compra en Patitas Felices!</p>
                                <p>Detalles de la orden:</p>
                                
                                <p>Nombre: Nombre del Cliente</p>
                                <p>Dirección: Dirección de Envío</p>
                                <p>Fecha de Entrega Estimada: XX/XX/XXXX</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
  };

  transporter.sendMail(options);
};

module.exports = sendPaymentSuccess;
