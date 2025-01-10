const pool = require('../db'); // Assuming you use pg for database

// Insert checkout data into the database
const insertCheckoutData = async (data) => {
    const query = `
    INSERT INTO checkout (name, phone, address, bike_name, bike_image, price, location, license)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  
  
  // Make sure userId is included in the data
  const values = [ data.name, data.phone, data.address, data.bike_name, data.bike_image, data.price, data.location, data.license];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted data
  } catch (error) {
    console.error('Error inserting checkout data:', error);
    throw error;
  }
};

const fetchCheckoutData = async () => {
  const query = 'SELECT * FROM checkout'; // Query to get all records from checkout table
  
  try {
    const result = await pool.query(query);
    return result.rows; // Return all rows as an array
  } catch (error) {
    console.error('Error fetching checkout data:', error.message);
    throw new Error('Failed to fetch checkout data');
  }
};

module.exports = {
  insertCheckoutData,
  fetchCheckoutData
};
