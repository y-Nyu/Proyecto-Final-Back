const prisma = require("../../db");

async function getAllSales() {
  const sales = await prisma.sale.findMany({
    include: {
      details: true,
      user: {
        select: {
          password: false,
          email: true,
          name: true,
          address: true,
          rol: true,
        },
      },
    },
  });

  if (sales.length === 0) throw Error("No sales present in the database");

  return sales;
}

module.exports = getAllSales;
