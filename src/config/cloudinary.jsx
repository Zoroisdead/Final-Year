import { Cloudinary } from 'cloudinary-core';

// Debugging environment variables
console.log('Cloudinary Configurations:');
console.log('Cloud Name:', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.REACT_APP_CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.REACT_APP_CLOUDINARY_API_SECRET);

// Initialize Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

export default cloudinary;
