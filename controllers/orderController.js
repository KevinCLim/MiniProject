const db = require('../models');
const Order = db.Order;

// Place an order
exports.placeOrder = async (req, res) => {
  const { userId, products } = req.body;

  try {
    const newOrder = await Order.create({ userId, products });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Read an order's details
exports.getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update an order's details
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).send('Order not found');

    order.products = products || order.products;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).send('Order not found');

    await order.destroy();

    res.send('Order deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Read all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// List the history of a user's past orders
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// See the products ordered in a certain order
exports.getOrderProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).send('Order not found');
    res.json(order.products);
  } catch (error) {
    res.status(500).send('Server error');
  }
};