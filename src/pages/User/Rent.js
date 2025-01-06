import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Bike4 from '../../assets/Bike4.jpg';
import Bike5 from '../../assets/Bike5.jpg';
import Bike6 from '../../assets/Bike6.jpg';

function Rent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bike } = location.state || {
    name: "Bajaj Pulsar 150",
    image: "/assets/default-bike.jpg",
    description: "Standard Bike",
    price: 11.44,
    location: "J P Marg, Kathmandu",
  };

  const [rentalDates, setRentalDates] = useState({
    startDate: "2024-12-14",
    endDate: "2024-12-15",
    pickupTime: "10:00",
    dropoffTime: "10:00",
  });

  const [totalPrice, setTotalPrice] = useState(bike.price); // Initialize with the daily price

  // Function to calculate the number of days between two dates
  const calculateRentalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const days = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
    return days < 0 ? 0 : days; // If negative, return 0 days
  };

  // Update the total price based on the selected rental dates
  const updatePrice = () => {
    const rentalDays = calculateRentalDays(rentalDates.startDate, rentalDates.endDate);
    const newTotalPrice = rentalDays * bike.price; // Multiply by the daily price
    setTotalPrice(newTotalPrice);
  };

  // Handle date changes and update the price
  const handleDateChange = (e) => {
    setRentalDates({ ...rentalDates, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    updatePrice(); // Update price whenever dates change
  }, [rentalDates]);

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

  const handleBikeSelect = (selectedBike) => {
    navigate("/rent", { state: { bike: selectedBike } });
  };

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
          <h2>{calculateRentalDays(rentalDates.startDate, rentalDates.endDate)} Day Rental</h2>
          <p className="rental-price">{totalPrice.toFixed(2)} €</p>
          <div className="rental-form">
            <label>Rental Dates:</label>
            <input
              type="date"
              name="startDate"
              value={rentalDates.startDate}
              onChange={handleDateChange}
            />
            to
            <input
              type="date"
              name="endDate"
              value={rentalDates.endDate}
              onChange={handleDateChange}
            />
            <label>Pickup:</label>
            <input
              type="time"
              name="pickupTime"
              value={rentalDates.pickupTime}
              onChange={handleDateChange}
            />
            <label>Dropoff:</label>
            <input
              type="time"
              name="dropoffTime"
              value={rentalDates.dropoffTime}
              onChange={handleDateChange}
            />
          </div>
          <Link
            to="/checkout"
            className="checkout-btn"
            state={{ bike, rentalDates }}
          >
            Checkout
          </Link>
          <p className="best-price">Best price guaranteed.</p>
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

export default Rent;
