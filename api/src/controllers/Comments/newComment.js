const prisma = require("../../db");

const createComment = async (userId, productId, text) => {
  const comment = await prisma.comment.create({
    data: {
      text: text,
      productId: productId,
      userId: userId,
    },
  });

  return comment;
};

module.exports = createComment;
