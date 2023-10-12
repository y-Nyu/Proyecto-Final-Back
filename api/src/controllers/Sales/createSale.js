const prisma = require("../../db");

async function createSale(iduser, idproduct, quantity) {
  const product = await prisma.product.findFirst({
    where: {
      id: idproduct,
    },
  });

  if (!product) throw Error("No such product in the database");

  // if (product.stock - quantity < 0)
  //   throw Error("Bought quantity greater than stock");

  const detail = await prisma.detail.create({
    data: {
      image: product.image,
      name: product.name,
      quantity: quantity,
      price: product.price,
      total: product.price * quantity,
      sale: {
        create: {
          iduser: iduser,
        },
      },
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  });

  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      stock: product.stock - quantity,
    },
  });

  return detail;
}

module.exports = createSale;
