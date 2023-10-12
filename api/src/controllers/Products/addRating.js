const prisma = require("../../db");

const addRating = async (id, userId, newRating) => {
  const ratingObj = await prisma.rating.findFirst({
    where: {
      productId: id,
      userId,
    },
  });

  await prisma.rating.upsert({
    where: {
      id: ratingObj ? ratingObj.id : -1,
      productId: id,
      userId,
    },
    update: {
      rating: newRating,
    },
    create: {
      rating: newRating,
      userId,
      productId: id,
    },
  });

  const updatedProduct = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      Rating: true,
    },
  });

  let currRating = 0;

  let rating_arr = updatedProduct.Rating;

  for (const rtng of rating_arr) {
    currRating += rtng.rating;
  }

  currRating /= rating_arr.length;

  return { ...updatedProduct, rating: currRating };
};

module.exports = addRating;
