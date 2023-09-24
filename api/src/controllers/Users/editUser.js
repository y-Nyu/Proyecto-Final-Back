const prisma = require("../../db");

const editUser = async (id, name, email, password, celular) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
      celular,
    },
  });
  return user;
};

module.exports = editUser;
