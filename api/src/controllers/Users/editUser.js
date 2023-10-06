const prisma = require("../../db");

const editUser = async (id, name, email, password, celular) => {
  let user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  // if (user.password === password) throw Error("Same password provided");

  user = await prisma.user.update({
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
