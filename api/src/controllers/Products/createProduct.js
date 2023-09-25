const prisma = require("../../db");

const createProduct = async (name, image, brand, category, price) => {
  const product = await prisma.product.create({
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

module.exports = createProduct;
