import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import Navbar from "../../components/Navbar";
import Bike4 from '../../assets/Bike4.jpg';
import Bike5 from '../../assets/Bike5.jpg';
import Bike6 from '../../assets/Bike6.jpg';
import { uploadImageToCloudinary } from '../../config/uploadImageToCloudinary';
import { insertCheckoutData } from "../../services/checkoutAPI";

function CheckOut() {
  const location = useLocation();
  console.log("Location State:", location.state); // Debug: Check location state
  const navigate = useNavigate();

  // Fallback to a default bike if location.state or bike is undefined
  const bike = (location.state && location.state.bike) ? location.state.bike : {
    bike_name: "Bajaj Pulsar 150",
    bike_image: "/assets/default-bike.jpg",
    description: "Standard Bike",
    price: 11.44,
    location: "J P Marg, Kathmandu",
  };

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
    licensePhoto: null, // Ensure license photo is set in state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number input to allow only numbers and a maximum of 10 digits
    if (name === "phone" && (!/^\d{0,10}$/.test(value))) {
      return; // Reject invalid input
    }

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserInfo({ ...userInfo, licensePhoto: e.target.files[0] });
  };

  const handleAccept = async () => {
    // Check for missing fields
    if (!userInfo.name || !userInfo.phone || !userInfo.address || !userInfo.licensePhoto) {
      alert("All fields are required.");
      return;
    }

    // Validate phone number for exactly 10 digits
    if (userInfo.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      // Upload the license photo to Cloudinary
      const licenseImageUrl = await uploadImageToCloudinary(userInfo.licensePhoto);

      if (!licenseImageUrl) {
        alert("Failed to upload license photo.");
        return;
      }

      // Prepare the checkout data for submission
      const checkoutData = {
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        license: licenseImageUrl, // Cloudinary URL for license photo
        bike,
      };

      // Insert checkout data into the database
      await insertCheckoutData(checkoutData);

      alert("Checkout form submitted successfully!");
      navigate("/"); // Redirect after submission
    } catch (error) {
      console.error("Error during checkout submission:", error);
      alert("Failed to submit checkout form. Please try again.");
    }
  };

  const handleDecline = () => {
    // Navigate to a different page or show a confirmation message
    navigate("/"); // Example: Navigate to the home page on decline
  };

  const handleBikeSelect = (selectedBike) => {
    navigate("/rent", { state: { bike: selectedBike } });
  };

  const recommendedBikes = [
    {
      bike_name: "Royal Enfield Classic 350",
      bike_image: Bike4,
      description: "A classic touring bike.",
      price: 15.99,
      location: "Thamel, Kathmandu",
    },
    {
      bike_name: "Honda Shine 125",
      bike_image: Bike5,
      description: "A lightweight city bike.",
      price: 9.99,
      location: "New Road, Kathmandu",
    },
    {
      bike_name: "KTM Duke 200",
      bike_image: Bike6,
      description: "A sporty bike for thrill-seekers.",
      price: 19.99,
      location: "Baneshwor, Kathmandu",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="rent-container">
        {/* Left Section */}
        <div className="bike-details-policy">
          <div className="bike-details">
            <div className="bike-image">
              <img src={bike.bike_image} alt={bike.bike_name} />
            </div>
            <div className="bike-info">
              <h1>{bike.bike_name}</h1>
              <p className="bike-specs">Location: {bike.location}</p>
              <p className="bike-specs">{bike.description}</p>
            </div>
          </div>

          {/* Rental Policy */}
          <div className="rental-policy">
            <h3>Rental Policy</h3>
            <ul>
              <li>💳 Pay only 15% now, and the rest at the destination.</li>
              <li>❌ Bookings are non-refundable once accepted.</li>
              <li>🛂 Requires a valid license.</li>
              <li>🔞 Must be at least 20 years old to rent.</li>
              <li>🔐 Refundable security deposit required.</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="rental-summary">
          <h2>Checkout</h2>
          <form className="checkout-form">
            <label>
              Full Name:
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Address:
              <textarea
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                required
              ></textarea>
            </label>
            <label>
              Upload License Photo:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </label>
            <div className="checkout-buttons">
              <button type="button" onClick={handleAccept} className="checkout-btn">
                Accept
              </button>
              <button type="button" onClick={handleDecline} className="decline-btn">
                Decline
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recommended Bikes */}
      <div className="you-may-like">
        <h2>You May Like</h2>
        <div className="recommended-bikes">
          {recommendedBikes.map((bike, index) => (
            <div key={index} className="bike-card">
              <img src={bike.bike_image} alt={bike.bike_name} />
              <div className="bike-card-info">
                <h3>{bike.bike_name}</h3>
                <p>{bike.description}</p>
                <p className="bike-price">{bike.price} € / day</p>
                <button onClick={() => handleBikeSelect(bike)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
