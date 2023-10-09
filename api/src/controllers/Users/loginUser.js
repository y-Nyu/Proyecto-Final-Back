const prisma = require("../../db");
const bcrypt = require("bcrypt");

const loginUser = async (email, password) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) throw Error("Invalid email provided");
  if (user.google) throw Error("This user was registered with google");

  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) throw Error("Incorrect password provided");

  return user;
};

module.exports = loginUser;
