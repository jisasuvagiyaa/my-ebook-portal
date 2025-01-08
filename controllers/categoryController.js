const Category = require('../models/Category');

// Create Category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    await category.save();

    res.status(201).send({
      message: 'Category created successfully',
      category: {
        id: category._id,
        name: category.name
      }
    });
  } catch (error) {
    res.status(400).send({
      message: 'Error creating category',
      error: error.message
    });
  }
};

// Get all Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).send({
      message: 'Categories retrieved successfully',
      categories: categories.map(category => ({
        id: category._id,
        name: category.name
      }))
    });
  } catch (error) {
    res.status(400).send({
      message: 'Error retrieving categories',
      error: error.message
    });
  }
};
