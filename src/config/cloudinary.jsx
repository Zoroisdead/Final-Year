import { Cloudinary } from 'cloudinary-core';


const REACT_APP_CLOUDINARY_CLOUD_NAME="dwb4qgrhw"
const REACT_APP_CLOUDINARY_API_KEY="476618423494212"
const REACT_APP_CLOUDINARY_API_SECRET="C1wkAaEki9kpfzEvq4FTevsiBuA"
// const REACT_APP_CLOUDINARY_UPLOAD_PRESET=Images

// Debugging environment variables
console.log('Cloudinary Configurations:');
console.log('Cloud Name:',REACT_APP_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', REACT_APP_CLOUDINARY_API_KEY);
console.log('API Secret:', REACT_APP_CLOUDINARY_API_SECRET);

// Initialize Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: REACT_APP_CLOUDINARY_API_KEY,
  api_secret: REACT_APP_CLOUDINARY_API_SECRET,
});

export default cloudinary;
