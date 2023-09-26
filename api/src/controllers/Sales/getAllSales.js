const prisma = require("../../db");

async function getAllSales() {
  const sales = await prisma.sale.findMany({
    include: {
      details: true,
    },
  });

  if (sales.length === 0) throw Error("No sales present in the database");

  return sales;
}

module.exports = getAllSales;
