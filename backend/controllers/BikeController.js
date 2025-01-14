const bikeModel = require('../models/BikeModel');

// Fetch all bikes
const getAllBikes = async (req, res) => {
  try {
    const bikes = await bikeModel.getAllBikes();
    res.status(200).json(bikes);
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ message: 'Error fetching bike data', error: error.message });
  }
};

// Add a new bike
const addBike = async (req, res) => {
  const { bike_name, description, price } = req.body;
  const bike_image = req.file?.path; // Get uploaded image path

  // Validation check for required fields
  if (!bike_name || !price) {
    return res.status(400).json({ error: 'Bike name and price are required fields' });
  }

  try {
    // Insert bike into database
    const newBike = await bikeModel.insertBike(bike_name, description, price, bike_image);
    res.status(201).json({ message: 'Bike added successfully', bike: newBike });
  } catch (error) {
    console.error('Error adding bike:', error);
    res.status(500).json({
      message: 'An error occurred while adding the bike.',
      details: error.message || error,
    });
  }
};

// Fetch a bike by ID
const getBikeById = async (req, res) => {
  const { id } = req.params;

  try {
    const bike = await bikeModel.getBikeById(id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json(bike);
  } catch (error) {
    console.error('Error fetching bike by ID:', error);
    res.status(500).json({ message: 'Error fetching bike data', error: error.message });
  }
};

// Delete a bike by ID
const deleteBike = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await bikeModel.deleteBike(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json({ message: 'Bike deleted successfully' });
  } catch (error) {
    console.error('Error deleting bike:', error);
    res.status(500).json({ message: 'Error deleting bike', error: error.message });
  }
};

// Update a bike by ID
const updateBike = async (req, res) => {
  const { id } = req.params;
  const { bike_name, description, price } = req.body;
  const bike_image = req.file?.path; // Optional new image

  // Validation check for required fields
  if (!bike_name || !price) {
    return res.status(400).json({ error: 'Bike name and price are required fields' });
  }

  try {
    // Update bike in the database
    const updatedBike = await bikeModel.updateBike(id, bike_name, description, price, bike_image);
    if (!updatedBike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json({
      message: 'Bike updated successfully',
      bike: updatedBike,
    });
  } catch (error) {
    console.error('Error updating bike:', error);
    res.status(500).json({ message: 'Error updating bike', error: error.message });
  }
};
// Inside your BikeController
const deleteRentalRequest = async (checkoutid) => {
  const query = 'DELETE FROM rentals WHERE checkoutid = ?';
  await db.execute(query, [checkoutid]);
};




module.exports = {
  getAllBikes,
  addBike,
  getBikeById,
  deleteBike,
  updateBike,
  deleteRentalRequest
};
