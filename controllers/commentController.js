
const Comment = require('../models/Comment');

// Post Comment Reader only
exports.postComment = async (req, res) => {
  const { book_id, content, rating } = req.body;

  try {
    const comment = new Comment({
      user_id: req.user._id,
      book_id,
      content,
      rating,
    });
    await comment.save();

    res.status(201).send({
      message: 'Comment posted successfully',
      comment: {
        id: comment._id,
        user_id: comment.user_id,
        book_id: comment.book_id,
        content: comment.content,
        rating: comment.rating,
        status: comment.status 
      }
    });
  } catch (error) {
    res.status(400).send({
      message: 'Error posting comment',
      error: error.message
    });
  }
};

// Approve or Reject Comment Author only
exports.moderateComment = async (req, res) => {
  if (req.user.role !== 'author') {
    return res.status(403).send({
      message: 'Not authorized to moderate comments'
    });
  }

  const { status } = req.body;
  const comment = await Comment.findById(req.params.id);

  if (!comment || comment.book_id.author_id.toString() !== req.user._id.toString()) {
    return res.status(404).send({
      message: 'Comment not found or not authorized'
    });
  }

  comment.status = status;
  await comment.save();

  res.status(200).send({
    message: `Comment ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
    comment: {
      id: comment._id,
      book_id: comment.book_id,
      user_id: comment.user_id,
      content: comment.content,
      rating: comment.rating,
      status: comment.status
    }
  });
};