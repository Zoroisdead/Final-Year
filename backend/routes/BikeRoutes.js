const express = require('express');
const bikeController = require('../controllers/BikeController');
const router = express.Router();

router.get('/', bikeController.getAllBikes);
router.post('/add', bikeController.addBike); // Correct route for adding a new bike
router.get('/:id', bikeController.getBikeById);
router.delete('/:id', bikeController.deleteBike);
router.put('/:id', bikeController.updateBike);

module.exports = router;
