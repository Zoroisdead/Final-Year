// src/pages/BikeManagement/EditBike.js
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViTextInput from "../../../components/ViTextInput";
import ViMessage from "../../../components/ViMessage";

const EditBike = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming bike id is passed via URL params
  const [bikeName, setBikeName] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [bikePrice, setBikePrice] = useState('');
  const [bikeColor, setBikeColor] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Logic to fetch bike data (API call or local storage)
    // Example with hardcoded data:
    const bikeData = { 
      name: "Bike A", 
      model: "Model A", 
      price: "1000", 
      color: "Red", 
      year: "2022" 
    }; // Replace with dynamic data
    setBikeName(bikeData.name);
    setBikeModel(bikeData.model);
    setBikePrice(bikeData.price);
    setBikeColor(bikeData.color);
    setManufactureYear(bikeData.year);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'bikeName':
        setBikeName(value);
        break;
      case 'bikeModel':
        setBikeModel(value);
        break;
      case 'bikePrice':
        setBikePrice(value);
        break;
      case 'bikeColor':
        setBikeColor(value);
        break;
      case 'manufactureYear':
        setManufactureYear(value);
        break;
      default:
        break;
    }
  };

  const handleEditBike = () => {
    if (!bikeName || !bikeModel || !bikePrice || !bikeColor || !manufactureYear) {
      setErrorMessage('All fields are required.');
      return;
    }
    // Logic to edit bike (API call or local storage update)
    console.log("Bike updated:", { id, bikeName, bikeModel, bikePrice, bikeColor, manufactureYear });

    // Redirect to View Bikes page after editing
    navigate('/admin/bike-management/view');
  };

  return (
    <div>
      <h1>Edit Bike</h1>
      {errorMessage && <ViMessage message={errorMessage} />}
      <ViTextInput
        title="Bike Name"
        name="bikeName"
        value={bikeName}
        handleInputChange={handleInputChange}
      />
      <ViTextInput
        title="Bike Model"
        name="bikeModel"
        value={bikeModel}
        handleInputChange={handleInputChange}
      />
      <ViTextInput
        title="Bike Price"
        name="bikePrice"
        value={bikePrice}
        handleInputChange={handleInputChange}
      />
      <ViTextInput
        title="Bike Color"
        name="bikeColor"
        value={bikeColor}
        handleInputChange={handleInputChange}
      />
      <ViTextInput
        title="Manufacture Year"
        name="manufactureYear"
        value={manufactureYear}
        handleInputChange={handleInputChange}
      />
      <div className="form-group">
        <button onClick={handleEditBike} className="btn">Save Changes</button>
      </div>
    </div>
  );
};

export default EditBike;
