const prisma = require("../../db");

const newCategory = async (name) => {
  const newCategory = await prisma.category.create({
    data: {
      name,
      active: true,
    },
  });
  return newCategory;
};

module.exports = newCategory;
