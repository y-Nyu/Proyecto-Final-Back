const prisma = require("../../db");

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

module.exports = deleteUser;
