import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/checkout'; // API URL

export const insertCheckoutData = async (checkoutData) => {
  try {
    const response = await axios.post(BASE_URL, checkoutData); // Send data to backend
    return response.data;
  } catch (error) {
    console.error('Error inserting checkout data:', error);
    throw error;
  }
};
