const prisma = require('../../db');
const createSaleController = require("../../controllers/Sales/createSale");

const createSale = async (req, res) => {
    
    // Es mala idea obtener el precio del producto desde la req.
    // Cualquiera puede dar un precio más barato que el real en la solicitud
    // y sacar beneficios ilícitos
    const {iduser, idproduct, price, quantity, bill} = req.body; 
    
    createSaleController(iduser, idproduct, price, quantity, bill)
        .then(sale => {
            res.status(200).json({...sale});
        })
        .catch(err => res.status(500).json({error: err.message}));


};


module.exports = {
    createSale,
}