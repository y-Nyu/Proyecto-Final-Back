const createProduct = require("../../controllers/Products/createProduct");
const deleteProduct = require("../../controllers/Products/deleteProduct");
const editProduct = require("../../controllers/Products/editProduct");
const addStock = require("../../controllers/Products/addStock");
const {
  getProduct,
  getProductById,
  getProductByName,
} = require("../../controllers/Products/getProduct");

//
// EN ESTE ARCHIVO CAMBIO MÁS QUE NADA QUE EL PRODUCTO SE DEVUELVA
// EN SU TOTALIDAD POR LA RESPONSE
//
//---- LA FUNCIÓN editAProduct LA CAMBIO PARA PODER AGREGAR STOCK
//---- LA FUNCIÓN createNewProduct LA CAMBIO PARA CREAR CON STOCK

//Creacion de un nuevo producto:

const createNewProduct = async (req, res) => {
  const { name, image, brand, description, category, price, stock } = req.body;

  // Aca no parseo porque vienen del body como deben ser (SUPUESTAMENTE)
  try {
    const product = await createProduct(
      name,
      image,
      brand,
      category,
      description,
      price,
      stock
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Borrar un producto:

const deleteAProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await deleteProduct(+id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Editar un producto:

const editAProduct = async (req, res) => {
  const { id } = req.params;
  const { add } = req.query;
  const { name, image, brand, category, price, stock, active } = req.body;

  try {
    if (!add) {
      const product = await editProduct(
        +id,
        name,
        image,
        brand,
        category,
        price,
        stock,
        active
      );
      return res.status(201).json(product);
    }

    const product = await addStock(+id, stock);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Obtener todos los productos:

const getAProduct = async (req, res) => {
  try {
    // Debo parsear el price porque viene de la url como query
    const { name, brand, price, category, sort } = req.query;

    if (!name) {
      const product = await getProduct(brand, +price, category, sort);

      res.status(200).json(product);
    } else {
      const product = await getProductByName(
        name,
        brand,
        +price,
        category,
        sort
      );
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "No se logró encontrar el producto solicitado" });
  }
};

//Obtener una producto por su Id:

const getProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(+id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "No se logró encontrar el producto solicitado" });
  }
};

module.exports = {
  createNewProduct,
  deleteAProduct,
  editAProduct,
  getAProduct,
  getProductId,
};
