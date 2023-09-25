const prisma = require("../../db");

const deleteProduct = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return product;
};

module.exports = deleteProduct;
