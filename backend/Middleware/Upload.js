const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bikes', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Supported formats
  },
});

// Configure Multer
const upload = multer({ storage });

module.exports = upload;
