const prisma = require("../../db");

const deleteComment = async (id) => {
  const Comment = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return Comment;
};

module.exports = deleteComment;
