const prisma = require("../../db");

const createProduct = async (
  name,
  image,
  brand,
  category,
  description,
  price,
  stock
) => {
  console.log(category);
  const product = await prisma.product.create({
    data: {
      name: name,
      image: image,
      brand: brand,
      category: category,
      description: description,
      price: price,
      stock: stock,
    },
  });
  return product;
};

module.exports = createProduct;
