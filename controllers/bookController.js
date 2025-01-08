const Book = require('../models/Book');

// Create Book Author only
exports.createBook = async (req, res) => {
  if (req.user.role !== 'author') {
    return res.status(403).send({ message: 'Not authorized to create books' });
  }

  const { title, category_id, status } = req.body;

  try {
    const book = new Book({ title, author_id: req.user._id, category_id, status });
    await book.save();

    res.status(201).send({
      message: 'Book created successfully',
      book: {
        id: book._id,
        title: book.title,
        author_id: book.author_id,
        category_id: book.category_id,
        status: book.status,
      }
    });
  } catch (error) {
    res.status(400).send({ message: 'Error creating book', error: error.message });
  }
};

// Get all Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('category_id');

    res.status(200).send({
      message: 'Books retrieved successfully',
      books: books.map(book => ({
        id: book._id,
        title: book.title,
        category_id: book.category_id,
        status: book.status
      }))
    });
  } catch (error) {
    res.status(400).send({ message: 'Error retrieving books', error: error.message });
  }
};

// Get Book by ID
exports.getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).populate('category_id');
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.status(200).send({
      message: 'Book details retrieved successfully',
      book: {
        id: book._id,
        title: book.title,
        author_id: book.author_id,
        category_id: book.category_id,
        status: book.status
      }
    });
  } catch (error) {
    res.status(400).send({ message: 'Error retrieving book', error: error.message });
  }
};
