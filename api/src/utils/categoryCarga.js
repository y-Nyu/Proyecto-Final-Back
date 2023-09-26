const prisma = require("../db");
const productsJson = require("./db.json");

const categorys = productsJson.products.map((product) => product.category);

const uniqueCategories = [...new Set(categorys)];

const create = async () => {
  uniqueCategories.map(async (c) => {
    // Verifica si la categoría ya existe en la base de datos
    const existingCategory = await prisma.category.findUnique({
      where: {
        name: c,
      },
    });
    if (!existingCategory) {
      const categorySuccess = await prisma.category.create({
        data: {
          name: c,
          active: true,
        },
      });
      console.log(`Categoría creada: ${categorySuccess.name}`);
    }
  });
};

module.exports = create;
