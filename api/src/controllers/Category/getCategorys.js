const prisma = require("../../db");
const create = require("../../utils/categoryCarga");

const getCategorys = async () => {
  await create();
  const categorys = await prisma.category.findMany();
  return categorys;
};

module.exports = getCategorys;
