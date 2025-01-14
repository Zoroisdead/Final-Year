const express = require('express');
const bikeController = require('../controllers/BikeController');
const upload = require('../Middleware/Upload');
const { body, param } = require('express-validator');

const router = express.Router();

// Fetch all bikes
router.get('/', bikeController.getAllBikes);

// Add a new bike
// router.post(
//   '/add',
//   [
//     body('bike_name').notEmpty().withMessage('Bike name is required'),
//     body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
//   ],
//   upload.single('bike_image'),
//   bikeController.addBike
// );


router.post(
  '/add',
  upload.single('bike_image'), // Middleware for handling file uploads
  [
    body('bike_name').notEmpty().withMessage('Bike name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  ],
  bikeController.addBike
);

// Backend: In the router (e.g., 'checkout.js')
router.delete('/decline/:id', async (req, res) => {
  const { checkoutid } = req.params;
  try {
    // Call the database function to delete the rental request by ID
    await bikeController.deleteRentalRequest(checkoutid);  // Assuming you have a deleteRentalRequest function
    res.status(200).json({ message: 'Rental request declined and deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to decline and delete rental request.' });
  }
});


// Fetch a bike by ID
router.get(
  '/:id',
  [param('id').isInt().withMessage('Bike ID must be a valid integer')],
  bikeController.getBikeById
);

// Delete a bike by ID
router.delete('/:id', bikeController.deleteBike);

// Update a bike by ID
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('Bike ID must be a valid integer'),
    body('bike_name').notEmpty().withMessage('Bike name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  ],
  upload.single('bike_image'),
  bikeController.updateBike
);

module.exports = router;
