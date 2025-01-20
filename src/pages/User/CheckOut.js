import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Bike4 from '../../assets/Bike4.jpg';
import Bike5 from '../../assets/Bike5.jpg';
import Bike6 from '../../assets/Bike6.jpg';
import { uploadImageToCloudinary } from '../../config/uploadImageToCloudinary';
import { insertCheckoutData } from "../../services/checkoutAPI";

// Helper function to calculate rental days
const calculateRentalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert time difference to days
};

function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract bike details, rental dates, totalPrice, and userId from location state
  const { bike, rentalDates, totalPrice } = location.state || {
    bike: {
      bike_name: "Bajaj Pulsar 150",
      bike_image: "/assets/default-bike.jpg",
      description: "Standard Bike",
      price: 11.44,
      location: "J P Marg, Kathmandu",
    },
    rentalDates: {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
    },
    totalPrice: 11.44,
  };

  // Calculate rental days
  const rentalDays = calculateRentalDays(rentalDates.startDate, rentalDates.endDate);

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
    licensePhoto: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log("User ID in CheckOut Component:", user.id); // Debugging line
    } else {
      console.error("No user found in localStorage.");
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInfo.name || !userInfo.phone || !userInfo.address || !userInfo.licensePhoto) {
      alert("All fields are required.");
      return;
    }
    
    if (userInfo.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const licenseImageUrl = await uploadImageToCloudinary(userInfo.licensePhoto);
      
      if (!licenseImageUrl) {
        alert("Failed to upload license photo.");
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user.id : null;  // Ensure this is not null

      console.log("User ID before submitting:", userId);  // Check this in the console

      if (!userId) {
        alert("User not logged in or invalid user ID.");
        return;
      }

      const checkoutData = {
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        license: licenseImageUrl,
        bike,
        rentalDays,
        totalPrice,
        user_id: userId,  // Ensure this is correctly assigned
      };

      await insertCheckoutData(checkoutData);
      navigate("/payment", { state: { bike, rentalDays, totalPrice } });
    } catch (error) {
      console.error("Error during checkout submission:", error);
      alert("Failed to submit checkout form. Please try again.");
    }
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
          <h3 className="h3">{rentalDays} Day Rental</h3>
          <h3 className="h3">Total Price: {totalPrice} Npr</h3>

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
