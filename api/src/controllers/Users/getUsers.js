const prisma = require("../../db");

//Busca todos los usuarios
const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      sales: {
        include: {
          details: true,
        },
      },
    },
  });

  return users.length === 0
    ? "La base de datos de usuarios se encuentra vacia"
    : users;
};

// Función para buscar un usuario por su ID
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      sales: {
        include: {
          details: true,
        },
      },
    },
  });
  return user;
};

// Función para buscar usuarios por su nombre
const getUsersByName = async (name) => {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  return users;
};

module.exports = { getUsers, getUserById, getUsersByName };
