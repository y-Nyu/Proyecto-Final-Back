const prisma = require("../../db");

const newUser = async (name, email, celular, password) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      celular,
      password,
    },
  });

  return user;
};

module.exports = newUser;
