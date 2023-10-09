const prisma = require("../../db");
const bcrypt = require("bcrypt");

const newUser = async (name, email, celular, password) => {
  // Generar un hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      celular,
      password: hashedPassword,
    },
  });

  return user;
};

module.exports = newUser;
