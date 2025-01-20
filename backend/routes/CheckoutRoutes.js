const express = require('express');
const router = express.Router();
const { checkout, acceptCheckoutData } = require('../controllers/CheckoutController');
const { deleteCheckoutData } = require('../controllers/CheckoutController');
const pool = require('../db'); // Import pool to interact with PostgreSQL

// POST request to submit checkout data
router.post('/', checkout);

// DELETE request to decline checkout
router.delete('/decline/:checkoutid', deleteCheckoutData);

// POST request to accept checkout
router.post('/accept/:checkoutid', acceptCheckoutData);

// GET request to fetch rented bookings (with optional filters)
router.get('/rented', async (req, res) => {
  const { userId, status, checkoutid } = req.query; // Add `checkoutid` to query parameters

  console.log('Received query parameters:', { userId, status, checkoutid }); // Log all query params

  try {
    let query = 'SELECT * FROM checkout WHERE 1=1'; // Start with a base query
    let values = [];

    // Add `checkoutid` filter if provided
    if (checkoutid) {
      query += ' AND checkoutid = $1'; // Use `checkoutid` in the query
      values.push(checkoutid);
    }

    // Add `userId` filter if provided and `checkoutid` is not specified
    if (!checkoutid && userId) {
      query += ' AND user_id = $1'; // Use `user_id` in the query
      values.push(userId);
    }

    // Add `status` filter if provided
    if (status) {
      query += ` AND status = $${values.length + 1}`;
      values.push(status);
    }

    console.log('Final query:', query); // Log the query
    console.log('Values:', values); // Log the parameters used in the query

    const result = await pool.query(query, values); // Execute the query

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "No bookings found." });
    }

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching rented bookings:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
