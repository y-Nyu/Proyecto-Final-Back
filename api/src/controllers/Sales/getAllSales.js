const prisma = require("../../db");

async function getAllSales()
{
    const sales = await prisma.sale.findMany();

    if(!sales) throw Error("No sales present in the database");

    return sales;
}

module.exports = getAllSales