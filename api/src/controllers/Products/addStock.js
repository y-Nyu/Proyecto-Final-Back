const prisma = require("../../db");

const addStock = async (id, quantity) => {
  if (quantity == 0) throw Error("Can't add zero to a product");

  // Solo podemos usar prisma.raw como alt. para esto
  // pero nos hace vulnerables a una SQL Injection
  // así que mejor desperdiciar recursos
  let product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) throw Error("No such product in the database");

  product = prisma.product.update({
    where: {
      id,
    },
    data: {
      stock: product.stock + quantity,
    },
  });

  return product;
};

module.exports = addStock;
