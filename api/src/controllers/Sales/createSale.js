const prisma = require("../../db");
const sendPaymentSuccess = require("../Mails/sendPaymentSuccess");

// products es un array de productos
async function createSale(iduser, productArr) {
  const idArr = productArr.map((prod) => {
    return { id: prod.id };
  });

  const products = await prisma.product.findMany({
    where: {
      OR: idArr,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: iduser,
    },
  });

  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total += productArr[i].quantity * parseFloat(products[i].price);
  }

  // EL MODELO DE DETAIL AHORA TIENE UN ARRAY
  // DE OBJETOS ( JSON[] ) LLAMADO products
  // ASÍ QUE SE ELIMINA LA RELACIÓN ENTRE DETAIL Y PRODUCT
  const detail = await prisma.detail.create({
    data: {
      total: total,
      sale: {
        create: {
          iduser: iduser,
        },
      },
      products: products.map((prod, index) => {
        // ESTE QUILOMBO DE ACÁ ES PARA NO DEVOLVER EL STOCK
        // PORQUE SEGURO ROMPEN LAS BOLAS CON ESO.
        // NO LE HAGO UNA FUNCIÓN APARTE PORQUE CREO
        // QUE LO VAMOS A HACER UNA SOLA VEZ Y YA
        return {
          id: prod.id,
          name: prod.name,
          brand: prod.brand,
          category: prod.category,
          image: prod.image,
          price: prod.price,
          description: prod.description,
          quantity: productArr[index].quantity,
        };
      }),
    },
  });

  for (let i = 0; i < products.length; i++) {
    prisma.product.update({
      where: {
        id: products[i].id,
      },
      data: {
        stock: products[i].stock - productArr[i].quantity,
      },
    });
  }

  if (user.email) {
    sendPaymentSuccess(user.email);
  }

  return detail;
}

module.exports = createSale;
