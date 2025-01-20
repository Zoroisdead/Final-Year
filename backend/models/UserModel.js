const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

// Function to get all users
const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const result = await pool.query(query);
  return result.rows; // Returns an array of user records
};

// Function to insert a new user
const insertUsers = async (username, email, password) => {
  try {
    const userId = uuidv4(); // Generate a UUID for the user
    const query = 'INSERT INTO users (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [userId, username, email, password];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted user data
  } catch (error) {
    throw new Error('Error inserting user: ' + error.message);
  }
};

// Function to authenticate a user
const authenticateUser = async (email, password) => {
  const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
  const values = [email, password];
  const result = await pool.query(query, values);
  return result.rows[0]; // Return the authenticated user data
};
const deleteUser = async (email) => {
  const query = 'DELETE FROM users WHERE email = $1 RETURNING *';
  const values = [email];
  const result = await pool.query(query, values);
  return result; // Returns the result of the deletion operation
};

const getUserById = async (userId) => {
  const query = 'SELECT user_id, fullname, username, email, address FROM users WHERE user_id = $1';
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows[0]; // Return the user data without password
};
const updateUser = async (userId, updatedData) => {
  const { fullname, username, email, address } = updatedData;

  const query = `
    UPDATE users 
    SET fullname = $1, username = $2, email = $3, address = $4 
    WHERE user_id = $5 
    RETURNING user_id, fullname, username, email, address
  `;
  const values = [fullname, username, email, address, userId];

  const result = await pool.query(query, values);
  return result.rows[0]; // Return the updated user data
};


module.exports = {
  getAllUsers,
  insertUsers,
  authenticateUser,
  deleteUser,
  getUserById,
  updateUser
};
