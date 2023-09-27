//Enviar objeto de producto de Json a MP:

const mercadopago = require("mercadopago");
require("dotenv").config();

const { ACCESS_TOKEN } = process.env;

//Configurar MP:
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

//Crear el controlador createOrger
const createOrder = async (req, res) => {
  try {
    const {
      id,
      name,
      brand,
      image,
      category,
     description,
      price,
      stock,
      active,
      quantity,
    } = req.body;

    // Crear las preferencias (objetos que nos pide MP con propiedades que necesitan para poder generar la pasarela)
    let preference = {
      // Lo hacemos en array de objetos ya que podemos comprar un producto o varios.
      items: [
        {
          id: id,
          name: name,
          brand: brand,
          picture_url: image,
          category: category,
          description: description,
          unit_price: price,
          quantity: quantity,
          active: active,
          currency_id: "ARS", // Si no estamos logueados en Arg. MP rastrea su moneda local.
        },
      ],
      // Le damos el control a MP donde este, le da la vista y funcionalidad. A continuación están los posibles desenlaces.
      back_urls: {
        success: "http://localhost:3001/success",
        failure: "http://localhost:3001/failure",
        pending: "http://localhost:3001/pending",
      },
      notification_url: "https://f068-167-249-52-106.ngrok-free.app/webhook",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createOrder;
