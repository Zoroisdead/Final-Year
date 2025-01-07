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
