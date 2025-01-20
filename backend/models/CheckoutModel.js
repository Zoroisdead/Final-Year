const pool = require('../db'); // Assuming you use pg for database

// Insert checkout data into the database
const { insertCheckoutData } = require('../models/CheckoutModel'); // Ensure you have a model for checkout

// Function to handle the checkout data
const checkout = async (req, res) => {
  const { name, phone, address, bike, license: licenseImageUrl, user_id } = req.body;
  
  if (!user_id) {
    return res.status(400).json({ message: "User ID is required." });
  }
  
  console.log("Received user ID in backend:", user_id); // Debugging line

  try {
    const checkoutData = {
      user_id,
      name,
      phone,
      address,
      bike_name: bike.bike_name,
      bike_image: bike.bike_image,
      price: bike.price,
      license: licenseImageUrl,
    };

    const insertedData = await insertCheckoutData(checkoutData);
    res.status(200).json({ message: 'Checkout successful', data: insertedData });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Failed to process checkout' });
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
