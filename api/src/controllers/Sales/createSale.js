const prisma = require("../../db");
const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: process.env.TOKEN_MERCADO_PAGO
});

async function createSale(email, idproduct, quantity)
{
    const product = await prisma.product.findFirst({where: {
        id: idproduct,
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


    return detail;
}

module.exports = createSale;