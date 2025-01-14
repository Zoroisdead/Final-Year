import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa"; // Importing upload icon from react-icons
import axios from "axios";
import ViTextInput from "../../../components/ViTextInput";
import ViMessage from "../../../components/ViMessage";
import { uploadImageToCloudinary } from "../../../config/uploadImageToCloudinary";

const AddBike = () => {
  const navigate = useNavigate();
  const [bikeName, setBikeName] = useState('');
  const [bikeDescription, setBikeDescription] = useState('');
  const [bikePrice, setBikePrice] = useState('');
  const [bikeImage, setBikeImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'bikeName':
        setBikeName(value);
        break;
      case 'bikeDescription':
        setBikeDescription(value);
        break;
      case 'bikePrice':
        setBikePrice(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setBikeImage(file);
    
    // Create a preview URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleAddBike = async () => {
    if (!bikeName || !bikeDescription || !bikePrice || !bikeImage) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Ensure the price is a valid number before submitting
    const parsedPrice = parseFloat(bikePrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Price must be a valid positive number.');
      return;
    }

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(bikeImage);

      if (!imageUrl) {
        setErrorMessage('Failed to upload image.');
        return;
      }

      // Prepare bike details
      const bikeDetails = {
        bike_name: bikeName,
        description: bikeDescription,
        price: parseFloat(bikePrice),
        bike_image: imageUrl,
      };

      // Save bike details to the API endpoint
      await axios.post('https://66d728f9006bfbe2e6500b43.mockapi.io/test', bikeDetails);

      // Navigate to the view bikes page
      navigate('/admin/bike-management/view');
    } catch (error) {
      const errorMessage = error.message || 'Failed to add bike';
      setErrorMessage(errorMessage);
      console.error('Error:', error); // Log the entire error object for debugging
    }
  };

  return (
    <div>
      <h1 className="heading">Add New Bike</h1>
      {errorMessage && <ViMessage message={errorMessage} />}
      <ViTextInput
        title="Bike Name"
        name="bikeName"
        value={bikeName}
        handleInputChange={handleInputChange}
      />
      <ViTextInput
        title="Bike Description"
        name="bikeDescription"
        value={bikeDescription}
        handleInputChange={handleInputChange}
      />
      <ViTextInput
        title="Bike Price"
        name="bikePrice"
        value={bikePrice}
        handleInputChange={handleInputChange}
        placeholder="Enter price in numeric format"
      />
      
      {/* Styled File Upload Box with Image Preview */}
      <div className="file-upload-container">
        <label htmlFor="file-input" className="file-upload-label">
          <FaUpload style={{ marginRight: "8px", fontSize: "20px" }} />
          Upload Bike Image
        </label>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <div className="image-container">
          {imagePreview ? (
            <img src={imagePreview} alt="Selected Bike" className="image-preview" />
          ) : (
            <span></span>
          )}
        </div>
      </div>

      <div className="form-group">
        <button onClick={handleAddBike} className="btn-">
          Add Bike
        </button>
      </div>
    </div>
  );
};

export default AddBike;
