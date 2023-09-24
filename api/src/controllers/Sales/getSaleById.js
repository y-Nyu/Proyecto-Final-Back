const prisma = require("../../db");

async function getSaleById(id)
{
    const sale = await prisma.sale.findFirstOrThrow({
        where: {
            id: parseInt(id)
        }
    });

    return sale;
}

module.exports = getSaleById;