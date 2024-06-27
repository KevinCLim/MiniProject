const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;

// Create a user
exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Read a user's details
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a user's details
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('User not found');

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete (deactivate) a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('User not found');

    user.isActive = false;
    await user.save();

    res.send('User deactivated');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Read all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
};