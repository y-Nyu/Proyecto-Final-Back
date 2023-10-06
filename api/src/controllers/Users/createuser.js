const prisma = require("../../db");
const bcrypt = require("bcrypt");

const newUser = async (name, address, email, celular, password) => {
  // Generar un hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      address,
      email,
      celular,
      password: hashedPassword,
    },
  });

  return user;
};

module.exports = newUser;
