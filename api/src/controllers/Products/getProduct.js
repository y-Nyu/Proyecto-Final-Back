const prisma = require("../../db");
//Busca todos los productos.

const getProduct = async (brand, maxPrice, categoryName, sort) => {
  let product = await prisma.product.findMany({
    where: {
      brand,
      price: {
        lte: isNaN(maxPrice) ? undefined : maxPrice,
      },
      category: {
        contains: categoryName,
      },
    },
    orderBy: [{ price: sort }],
  });

  return product.length === 0
    ? "No hay ninguna coincidencia en la base de datos"
    : product;
};

//Busca un producto por su N° de Id:

const getProductById = async (id) => {
  let product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

//Busca un producto por su nombre:

const getProductByName = async (name, brand, maxPrice, categoryName, sort) => {
  let product = prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
      brand,
      price: {
        lte: isNaN(maxPrice) ? undefined : maxPrice,
      },
      category: {
        contains: categoryName,
      },
    },

    orderBy: [{ price: sort }],
  });

  return product;
};

module.exports = { getProduct, getProductById, getProductByName };
