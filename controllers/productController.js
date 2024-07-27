const Product = require('../models').Product;
const db = require('../models/index');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = await db.Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Products
exports.getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Product.update(req.body, { where: { id } });
    if (updated) {
      const updatedProduct = await db.Product.findOne({ where: { id } });
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.Product.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
