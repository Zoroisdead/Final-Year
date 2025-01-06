import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/users'; // Adjusted URL to include /api

// Insert a new user
export const insertAllUsers = (userData) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL, userData)
      .then((res) => resolve(res.data))
      .catch((err) => {
        // Provide a more detailed error message
        const error = err.response ? err.response.data : err.message;
        reject(error);
      });
  });
};
