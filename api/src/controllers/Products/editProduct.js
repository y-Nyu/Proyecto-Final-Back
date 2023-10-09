const prisma = require("../../db");

const editProduct = async (
  id,
  name,
  image,
  brand,
  category,
  price,
  stock,
  active
) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      image,
      brand,
      category,
      stock,
      price,
      active,
    },
  });
  return product;
};

module.exports = editProduct;
