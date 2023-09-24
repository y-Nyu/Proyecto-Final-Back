const prisma = require("../../db");

async function createSale(iduser, idproduct, price, quantity, bill)
{
    const product = await prisma.product.findFirst({where: {
        id: parseInt(idproduct),
    }})

    if(!product) throw Error("No such product in the database");

    const sale = {
        idproduct: parseInt(idproduct),
        price: product.price,
        quantity: parseInt(quantity),
        bill: parseInt(quantity),
        iduser: parseInt(iduser),
        total: product.price * parseInt(quantity),
    };

    const saleRes = await prisma.sale.create({
        data: sale,
    });

    return saleRes;
}

module.exports = createSale;