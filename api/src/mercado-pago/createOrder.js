//Enviar objeto de producto de Json a MP:

const mercadopago = require("mercadopago");
require("dotenv").config();

const { ACCESS_TOKEN2 } = process.env;

//Configurar MP:
mercadopago.configure({
  access_token: ACCESS_TOKEN2,
});

//Crear el controlador createOrger
const createOrder = async (req, res) => {
  try {
    const cart = req.body;

    const items = await cart.map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand,
      picture_url: item.image,
      category: item.category,
      stock: item.stock,
      unit_price: Number(item.price),
      quantity: item.quantity,
      active: item.active,
      currency_id: "ARS",
    }));

    // Crear las preferencias (objetos que nos pide MP con propiedades que necesitan para poder generar la pasarela)

    let preference = {
      items,
      // Le damos el control a MP donde este, le da la vista y funcionalidad. A continuación están los posibles desenlaces.
      back_urls: {
        success: "https://pf-back-deploy.onrender.com/success",
        failure: "https://pf-back-deploy.onrender.com/failure",
        pending: "https://pf-back-deploy.onrender.com/pending",
      },
      auto_return: "approved",
      notification_url: "https://pf-back-deploy.onrender.com/webhook",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createOrder;
