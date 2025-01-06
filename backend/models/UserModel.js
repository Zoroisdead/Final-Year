const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

// Function to get all users
const getAllUsers = async () => {
  const query = 'SELECT email, password FROM users';
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

module.exports = {
  getAllUsers,
  insertUsers,
  authenticateUser,
  deleteUser,
};
