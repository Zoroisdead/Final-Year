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

module.exports = {
  checkout,
};
