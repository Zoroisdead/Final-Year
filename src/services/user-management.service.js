import axios from "axios";

const BASE_URL = 'http://localhost:5000/users';

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user
export const updateUser = async (userId, data) => {
  try {
    await axios.put(`${BASE_URL}/${userId}`, data);
    return true;
  } catch (error) {
    throw error;
  }
};

// Add new user
export const addUser = async (data) => {
  try {
    await axios.post(BASE_URL, data);
    return true;
  } catch (error) {
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/${userId}`);
    return true;
  } catch (error) {
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search by username
export const searchByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}?username=${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search by email
export const searchByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}?email=${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
