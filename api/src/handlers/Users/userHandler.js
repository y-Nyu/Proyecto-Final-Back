require("dotenv").config();
const { JWT_SECRET } = process.env;

const newUser = require("../../controllers/Users/createuser");
const deleteUser = require("../../controllers/Users/deleteUser");
const editUser = require("../../controllers/Users/editUser");
const {
  getUsers,
  getUserById,
  getUsersByName,
} = require("../../controllers/Users/getUsers");

const jwt = require("jsonwebtoken");

//Generar el TOKEN
function generateToken(user) {
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

//Creacion del usuario
const usersCreate = async (req, res) => {
  const { name, email, celular, password } = req.body;
  try {
    const user = await newUser(name, email, celular, password);

    // Generar un token JWT para el usuario
    const token = generateToken(user);

    res.status(201).json({ message: `Usuario creado: ${user.name}`, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Borrar el usuario
const userDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await deleteUser(+id);
    res.status(201).send(`Usuario eliminado: ${user.name}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Editar el usuario
const usersEdit = async (req, res) => {
  const { id } = req.params;
  const { name, email, celular, password } = req.body;
  try {
    const user = await editUser(+id, name, email, celular, password);
    res.status(201).json(`Usuario editado con exito ${user.name}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Obtener todos los usuarios
const usersGet = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      // Si no se proporciona un nombre, trae todos los usuarios
      const users = await getUsers();
      res.status(200).json(users);
    } else {
      // Si se proporciona un nombre, busca usuarios por nombre
      const users = await getUsersByName(name);
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

//Obtenes usuario por id
const userGetById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(+id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

module.exports = { usersCreate, userDelete, usersEdit, usersGet, userGetById };
