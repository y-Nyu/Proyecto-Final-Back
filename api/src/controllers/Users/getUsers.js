const prisma = require("../../../db");

//Busca todos los usuarios
const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

// Función para buscar un usuario por su ID
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

module.exports = { getUsers, getUserById };
