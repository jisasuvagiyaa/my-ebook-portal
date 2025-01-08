// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  views_count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Book', bookSchema);
