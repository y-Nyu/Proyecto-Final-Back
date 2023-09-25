const prisma = require("../../db");
const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: process.env.TOKEN_MERCADO_PAGO
});

async function createSale(iduser, idproduct, quantity)
{
    const product = await prisma.product.findFirst({where: {
        id: parseInt(idproduct),
    }})

    if(!product) throw Error("No such product in the database");

    const detail = await prisma.detail.create({
        data: {
            quantity: parseInt(quantity),
            price: parseFloat(price),
            total: parseFloat(price) * parseInt(quantity),
            sale: {
                create: {
                    iduser: parseInt(iduser),
                }
            },
            product: {
                connect: {
                    id: product.id,
                },
            }
        }
        
    })

    /*
    const preference = {
        items: [
            {
                title: product.name,
                quantity: parseInt(quantity),
                currency_id: 'ARS',
                unit_price: parseInt(price),
            }            
        ],
        back_urls: {
            success: "http://localhost:3001/sales/success",
            failure: "http://localhost:3001/sales/failure",
            pending: "http://localhost:3001/sales/pending"
        },
        notification_url: "http://localhost:3001/sales/notify",
    }

    

    const result = await mercadopago.preferences.create(preference)
    
    if(result.status !== "approved") throw Error("Payment error. Try again later...");
    
    */

    return detail;
}

module.exports = createSale;