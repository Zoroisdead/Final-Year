const userModel = require('../models/UserModel');

// Controller function to handle fetching all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};

// Controller function to add a new user
const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    const newUser = await userModel.insertUsers(username, email, password);
    res.status(201).json({
      message: 'User added successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
};

// Controller function to authenticate a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await userModel.authenticateUser(email, password);
    if (user) {
      res.status(200).json({
        message: 'Login successful',
        user,
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'An error occurred while logging in the user' });
  }
};
// Controller function to delete a user
const deleteUser = async (req, res) => {
  const { email } = req.params; // Get the user email from the URL params

  try {
    // Query to delete the user from the database
    const result = await userModel.deleteUser(email);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};


module.exports = {
  getAllUsers,
  addUser,
  loginUser,
};
