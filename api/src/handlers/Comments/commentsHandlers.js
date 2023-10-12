const createComment = require("../../controllers/Comments/newComment");
const deleteComment = require("../../controllers/Comments/deleteComment");

const createCommentHandler = async (req, res) => {
  const { userId, productId, text } = req.body;

  try {
    const comment = await createComment(+userId, +productId, text);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommentHandler = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedComment = await deleteComment(+id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { deleteCommentHandler, createCommentHandler };
