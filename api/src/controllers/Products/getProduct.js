const prisma = require("../../db");
//Busca todos los productos.

const getProduct = async () => {
  const product = await prisma.product.findMany({ include: { details: true } });
  return product.length === 0
    ? "No hay ninguna coincidencia en la base de datos"
    : product;
};

//Busca un producto por su N° de Id:

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: { details: true },
  });
  return product;
};

//Busca un producto por su nombre:

const getProductByName = async (name) => {
  const product = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    include: { details: true },
  });
  return product;
};

module.exports = { getProduct, getProductById, getProductByName };

// findMany() --> se utiliza para buscar y recuperar varios registros que cumplen con ciertos criterios de consulta de una tabla en la base de datos.

// findUnique() --> se utiliza para buscar y recuperar un único registro de una tabla en la base de datos. A diferencia de findMany(), que recupera múltiples registros
