const bikeModel = require('../models/BikeModel');

// Controller function to fetch all bikes
const getAllBikes = async (req, res) => {
  try {
    const bikes = await bikeModel.getAllBikes();
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bike data', error });
  }
};
// Controller function to add a new bike 
const addBike = async (req, res) => { const { bike_name, description, price } = req.body; const bike_image = req.file?.path; // Get the uploaded image path from Cloudinary
// 
 if (!bike_name || !price) { 
  return res.status(400).json({ error: 'Bike name and price are required fields' }); } try {
     const newBike = await bikeModel.insertBike(bike_name, description, price, bike_image);
      res.status(201).json({ message: 'Bike added successfully', bike: newBike });
     } catch 
     (error) { console.error('Error adding bike:', error.message); 
      res.status(500).json({ error: 'An error occurred while adding the bike' }); 
    } };
// Controller function to add a new bike
// const addBike = async (req, res) => {
//   const { bike_name, description, price } = req.body;

//   if (!bike_name || !price) {
//     return res
//       .status(400)
//       .json({ error: 'Bike name and price are required fields' });
//   }

//   try {
//     const newBike = await bikeModel.insertBike(bike_name, description, price);
//     res.status(201).json({
//       message: 'Bike added successfully',
//       bike: newBike,
//     });
//   } catch (error) {
//     console.error('Error adding bike:', error.message);
//     res.status(500).json({ error: 'An error occurred while adding the bike' });
//   }
// };

// Controller function to fetch a bike by ID
const getBikeById = async (req, res) => {
  const { id } = req.params;

  try {
    const bike = await bikeModel.getBikeById(id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bike data', error });
  }
};

// Controller function to delete a bike by ID
const deleteBike = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await bikeModel.deleteBike(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    res.status(200).json({ message: 'Bike deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bike', error });
  }
};

// Controller function to update a bike
const updateBike = async (req, res) => {
  const { id } = req.params;
  const { bike_name, description, price } = req.body;

  if (!bike_name || !price) {
    return res
      .status(400)
      .json({ error: 'Bike name and price are required fields' });
  }

  try {
    const updatedBike = await bikeModel.updateBike(
      id,
      bike_name,
      description,
      price
    );
    if (!updatedBike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json({
      message: 'Bike updated successfully',
      bike: updatedBike,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating bike', error });
  }
};

module.exports = {
  getAllBikes,
  addBike,
  getBikeById,
  deleteBike,
  updateBike,
};
