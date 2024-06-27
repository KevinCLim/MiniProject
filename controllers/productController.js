const db = require('../models');
const Product = db.Product;

// Create a product
exports.createProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;

  try {
    const newProduct = await Product.create({ name, description, price, quantity });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Read a product's details
exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a product's details
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).send('Product not found');

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).send('Product not found');

    await product.destroy();

    res.send('Product deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Create multiple products
exports.createMultipleProducts = async (req, res) => {
  const products = req.body;

  try {
    const newProducts = await Product.bulkCreate(products);
    res.status(201).json(newProducts);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Read all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete multiple products
exports.deleteMultipleProducts = async (req, res) => {
  const { ids } = req.body;

  try {
    await Product.destroy({ where: { id: ids } });
    res.send('Products deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
};