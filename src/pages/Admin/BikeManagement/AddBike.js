import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViTextInput from "../../../components/ViTextInput";
import ViMessage from "../../../components/ViMessage";
import { insertBike } from "../../../services/bikeAPI";

const AddBike = () => {
  const navigate = useNavigate();
  const [bikeName, setBikeName] = useState('');
  const [bikeDescription, setBikeDescription] = useState('');
  const [bikePrice, setBikePrice] = useState('');
  const [bikeImage, setBikeImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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
    setBikeImage(event.target.files[0]);
  };

  const handleAddBike = async () => {
    if (!bikeName || !bikeDescription || !bikePrice || !bikeImage) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (isNaN(bikePrice) || parseFloat(bikePrice) <= 0) {
      setErrorMessage('Price must be a valid positive number.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('bike_name', bikeName);
      formData.append('description', bikeDescription);
      formData.append('price', parseFloat(bikePrice));
      formData.append('bike_image', bikeImage);

      await insertBike(formData);
      navigate('/admin/bike-management/view');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add bike';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div>
      <h1>Add New Bike</h1>
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
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="form-group">
        <button onClick={handleAddBike} className="btn-">
          Add Bike
        </button>
      </div>
    </div>
  );
};

export default AddBike;
