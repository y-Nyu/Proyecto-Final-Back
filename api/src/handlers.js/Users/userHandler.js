const newUser = require("../../controllers/Users/createuser");
const deleteUser = require("../../controllers/Users/deleteUser");
const editUser = require("../../controllers/Users/editUser");
const { getUsers, getUserById } = require("../../controllers/Users/getUsers");

//Creacion del usuario
const usersCreate = async (req, res) => {
  const { name, email, celular, password } = req.body;
  try {
    const user = await newUser(name, email, celular, password);
    res.status(201).send(`Usuario creado: ${user.name}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Borrar el usuario
const userDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);
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
    const user = await editUser(id, name, email, celular, password);
    res.status(201).send(`Usuario editado: ${user}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Obtener todos los usuarios
const usersGet = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

//Obtenes usuario por id
const userGetById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
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
