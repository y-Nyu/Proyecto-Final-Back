const prisma = require("../../db");

const createProduct = async (
  name,
  image,
  brand,
  category,
  description,
  price
) => {
  const product = await prisma.product.create({
    data: {
      name: name,
      image: image,
      brand: brand,
      category: category,
      description: description,
      price: price,
    },
  });
  return product;
};

module.exports = createProduct;
