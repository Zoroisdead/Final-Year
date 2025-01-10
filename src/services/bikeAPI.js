import axios from "axios";

const BASE_URL = "http://localhost:5000/api/bike"; // API base URL

// Fetch all bikes
export const getAllBikes = async () => {
  return handleRequest(() => axios.get(BASE_URL));
};

// Insert a new bike
export const insertBike = async (bikeData) => {
  try {
    // Create a FormData object to append the bike data
    const formData = new FormData();
    formData.append('bike_name', bikeData.bike_name);
    formData.append('description', bikeData.description);
    formData.append('price', bikeData.price);
    
    // Add image if available
    if (bikeData.bike_image) {
      formData.append('bike_image', bikeData.bike_image);
    }

    // Make the POST request with the form data
    const response = await axios.post(`${BASE_URL}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data; // Return the response data from the server
  } catch (error) {
    console.error('Error submitting bike data:', error);
    throw new Error('An error occurred while adding the bike.');
  }
};


// Delete a bike by ID
export const deleteBike = async (bikeId) => {
  return handleRequest(() => axios.delete(`${BASE_URL}/${bikeId}`));
};

// Update a bike by ID
export const updateBike = async (bikeId, bikeData) => {
  return handleRequest(() => axios.put(`${BASE_URL}/${bikeId}`, bikeData));
};

// Fetch a specific bike by ID
export const getBikeById = async (bikeId) => {
  return handleRequest(() => axios.get(`${BASE_URL}/${bikeId}`));
};

// Centralized request handler for DRY code
const handleRequest = async (requestFunction) => {
  try {
    const response = await requestFunction();
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Centralized error handling
const handleAxiosError = (error) => {
  const errorMessage = error.response
    ? error.response.data.message || error.response.data
    : error.message;
  throw new Error(errorMessage);
};
