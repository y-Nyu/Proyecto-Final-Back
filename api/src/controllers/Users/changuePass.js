const prisma = require("../../db");
const bcrypt = require("bcrypt");

const changePass = async (id, password) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) throw Error("Invalid user");

  if (bcrypt.compareSync(password, user.password))
    throw Error("Password must be different");

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });

  return updatedUser;
};

module.exports = changePass;
