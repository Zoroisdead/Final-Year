const pool = require('../db');
const { insertCheckoutData } = require('../models/CheckoutModel'); // Ensure you have a model for checkout

// Function to handle the checkout data
const checkout = async (req, res) => {
  const { name, phone, address, bike, license: licenseImageUrl, user_id } = req.body;
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

const acceptCheckoutData = async (req, res) => {
  const { checkoutid } = req.params;

  try {
    // Update the status of the rental in the database
    const query = 'UPDATE checkout SET status = $1 WHERE checkoutid = $2 RETURNING *';
    const values = ['Accepted', checkoutid];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Rental request not found.' });
    }

    res.status(200).json({ success: true, message: 'Rental request accepted.', data: result.rows[0] });
  } catch (error) {
    console.error('Error accepting rental request:', error.message);
    res.status(500).json({ success: false, error: 'Failed to accept rental request.' });
  }
};

module.exports = {
  checkout,
  deleteCheckoutData,
  acceptCheckoutData,
};
