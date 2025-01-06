const db = require('../db'); // Assume this is your database connection

// Function to fetch all bikes
const getAllBikes = async () => {
  const query = 'SELECT * FROM Bike';
  const result = await db.query(query);
  return result.rows; // Assuming you're using PostgreSQL or similar
};

// Function to insert a new bike
const insertBike = async (bike_name, description, price, bike_image) => {
  const query =
    'INSERT INTO Bike (bike_name, description, price, bike_image) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [bike_name, description, price, bike_image];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Function to delete a bike by ID
const deleteBike = async (bike_id) => {
  const query = 'DELETE FROM Bike WHERE bike_id = $1';
  const result = await db.query(query, [bike_id]);
  return result;
};

// Function to fetch a bike by ID
const getBikeById = async (bike_id) => {
  const query = 'SELECT * FROM Bike WHERE bike_id = $1';
  const result = await db.query(query, [bike_id]);
  return result.rows[0];
};

// Function to update a bike by ID
const updateBike = async (bike_id, bike_name, description, price) => {
  const query =
    'UPDATE Bike SET bike_name = $1, description = $2, price = $3 WHERE bike_id = $4 RETURNING *';
  const values = [bike_name, description, price, bike_id];
  const result = await db.query(query, values);
  return result.rows[0];
};


module.exports = {
  getAllBikes,
  insertBike,
  deleteBike,
  getBikeById,
  updateBike,
};
