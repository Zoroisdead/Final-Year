const pool = require('../db');
const { insertCheckoutData } = require('../models/CheckoutModel'); // Assume you have a model for checkout

// Function to handle the checkout data
const checkout = async (req, res) => {
  const { name, phone, address, bike, license:licenseImageUrl } = req.body;  // Assume `userId` is sent from the frontend

  try {
    // Insert checkout data into the database with userId
    const checkoutData = {
    //   user_id: userId, // Link checkout to the user
      name,
      phone,
      address,
      bike_name: bike.bike_name,
      bike_image: bike.bike_image,
      price: bike.price,
      license: licenseImageUrl, // Assuming you've uploaded the license image to Cloudinary
    };

    // Save the data into the database (assuming `insertCheckoutData` is a function in the model)
    await insertCheckoutData(checkoutData);

    res.status(200).json({ message: 'Checkout successful' });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Failed to process checkout' });
  }
};
const deleteCheckoutData = async (req, res) => {
  const { checkoutid } = req.params; // Ensure it's checkoutid not id if your table uses checkoutid

  console.log('Deleting rental with checkoutid:', checkoutid); // Debugging line

  try {
    const query = 'DELETE FROM checkout WHERE checkoutid = $1 RETURNING *'; // Use checkoutid here
    const values = [checkoutid];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Rental request not found.' });
    }

    console.log('Rental deleted:', result.rows[0]); // Debugging line

    res.status(200).json({ success: true, message: 'Rental request deleted successfully.', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting rental request:', error.message);
    res.status(500).json({ success: false, error: 'Failed to delete rental request.' });
  }
};



module.exports = {
  checkout,
  deleteCheckoutData
};
