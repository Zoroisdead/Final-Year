import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // import useNavigate
import Navbar from "../../components/Navbar";
import Bike4 from '../../assets/Bike4.jpg';
import Bike5 from '../../assets/Bike5.jpg';
import Bike6 from '../../assets/Bike6.jpg';

function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { bike } = location.state || {
    name: "Bajaj Pulsar 150",
    image: "/assets/default-bike.jpg",
    description: "Standard Bike",
    price: 11.44,
    location: "J P Marg, Kathmandu",
  };

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
    licensePhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserInfo({ ...userInfo, licensePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout Details:", userInfo);
    alert("Checkout form submitted successfully!");
  };

  // Define the handleBikeSelect function
  const handleBikeSelect = (selectedBike) => {
    navigate("/rent", { state: { bike: selectedBike } }); // Navigate to Rent page with selected bike
  };

  const recommendedBikes = [
    {
      name: "Royal Enfield Classic 350",
      image: Bike4,
      description: "A classic touring bike.",
      price: 15.99,
      location: "Thamel, Kathmandu",
    },
    {
      name: "Honda Shine 125",
      image: Bike5,
      description: "A lightweight city bike.",
      price: 9.99,
      location: "New Road, Kathmandu",
    },
    {
      name: "KTM Duke 200",
      image: Bike6,
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
              <img src={bike.image} alt={bike.name} />
            </div>
            <div className="bike-info">
              <h1>{bike.name}</h1>
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
          <form className="checkout-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="checkout-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      {/* "You May Like" Section */}
      <div className="you-may-like">
        <h2>You May Like</h2>
        <div className="recommended-bikes">
          {recommendedBikes.map((bike, index) => (
            <div key={index} className="bike-card">
              <img src={bike.image} alt={bike.name} />
              <div className="bike-card-info">
                <h3>{bike.name}</h3>
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
