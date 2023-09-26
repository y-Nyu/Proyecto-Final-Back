const newCategory = require("../../controllers/Category/createCategory");
const getCategorys = require("../../controllers/Category/getCategorys");

////////////////////Traer categorias//////////////////////////////
const getCategory = async (req, res) => {
  try {
    const categories = await getCategorys();
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};
////////////////////Crear categoria//////////////////////////////
const categoryCreate = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategor = await newCategory(name);
    res.status(201).json({ message: `Categoria creada: ${newCategor.name}` });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

module.exports = { getCategory, categoryCreate };
