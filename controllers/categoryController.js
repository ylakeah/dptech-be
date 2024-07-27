const Category = require('../models').Category;
const db = require('../models/index');

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = await db.Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Category.update(req.body, { where: { id } });
    if (updated) {
      const updatedCategory = await db.Category.findOne({ where: { id } });
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.Category.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
