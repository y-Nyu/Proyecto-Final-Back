const prisma = require("../../db");


async function createSale(email, idproduct, quantity)
{
    const product = await prisma.product.findFirst({where: {
        id: parseInt(idproduct),
    }})

    if(!product) throw Error("No such product in the database");

    const iduser = (await prisma.user.findFirst({
        where: {
            email
        }
    })).id;

    const detail = await prisma.detail.create({
        data: {
            quantity: parseInt(quantity),
            price: parseFloat(product.price),
            total: parseFloat(product.price) * parseInt(quantity),
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