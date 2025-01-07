const db = require('../db'); // Database connection

// Fetch all bikes
const getAllBikes = async () => {
  const query = 'SELECT * FROM Bike';
  const result = await db.query(query);
  return result.rows;
};

// Insert a new bike
const insertBike = async (bike_name, description, price, bike_image) => {
  // Ensure price is a valid number
  if (isNaN(price)) {
    throw new Error('Price must be a numeric value');
  }

  // Proceed with inserting the bike if price is valid
  const query = 'INSERT INTO bikes (bike_name, description, price, bike_image) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [bike_name, description, price, bike_image];
  
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error inserting bike into the database');
  }
};


// Delete a bike by ID
const deleteBike = async (bike_id) => {
  const query = 'DELETE FROM Bike WHERE bike_id = $1';
  const result = await db.query(query, [bike_id]);
  return result;
};

// Fetch a bike by ID
const getBikeById = async (bike_id) => {
  const query = 'SELECT * FROM Bike WHERE bike_id = $1';
  const result = await db.query(query, [bike_id]);
  return result.rows[0];
};

// Update a bike by ID
const updateBike = async (bike_id, bike_name, description, price, bike_image) => {
  const query =
    'UPDATE Bike SET bike_name = $1, description = $2, price = $3, bike_image = $4 WHERE bike_id = $5 RETURNING *';
  const values = [bike_name, description, price, bike_image, bike_id];
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
