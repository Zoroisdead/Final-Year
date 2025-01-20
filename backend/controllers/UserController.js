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
      user: {
        id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
      },
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
        
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role // Add if roles are used
        },
      });
      
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'An error occurred while logging in the user' });
  }
};
const updateUser = async (req, res) => {
  const { userId } = req.params; // Assuming the userId is passed in the URL
  const { address, username, email, password, fullname } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const updatedUser = await userModel.updateUser(userId, { address, username, email, password, fullname });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
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
const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};


module.exports = {
  getAllUsers,
  addUser,
  loginUser,
  getUserById,
  updateUser
};
