const prisma = require("../../db");

const editProduct = async (id, name, image, brand, category, price) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      image,
      brand,
      category,
      price,
    },
  });
  return product;
};

module.exports = editProduct;
