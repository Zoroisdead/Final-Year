const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/CheckoutController'); // Import the checkout controller
const { fetchCheckoutData } = require('../models/CheckoutModel');
const { deleteCheckoutData} = require ('../controllers/CheckoutController')

// POST request to submit checkout data
router.post('/', checkout);
router.delete('/decline/:checkoutid', deleteCheckoutData);
router.get('/rented', async (req, res) => {
  try {
    const checkoutData = await fetchCheckoutData(); // Call the function
    res.status(200).json({ success: true, data: checkoutData }); // Return data in JSON format
  } catch (error) {
    console.error('Error in /rented route:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}); 


module.exports = router;
