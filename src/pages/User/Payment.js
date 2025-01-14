import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Bike4 from '../../assets/Bike4.jpg';
import Bike5 from '../../assets/Bike5.jpg';
import Bike6 from '../../assets/Bike6.jpg';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import success from '../../assets/success.png';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract bike details, rental days, and total price from location state
  const { bike, rentalDays, totalPrice } = location.state || {
    bike: {
      bike_name: "Bajaj Pulsar 150",
      bike_image: "/assets/default-bike.jpg",
      description: "Standard Bike",
      price: 11.44,
      location: "J P Marg, Kathmandu",
    },
    rentalDays: 1,
    totalPrice: 11.44,
  };

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [paymentStatus, setPaymentStatus] = useState(""); // To handle payment status messages
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal visibility state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const { name, address, email } = userInfo;

    if (!name || !address || !email) {
      alert("Please fill in all fields.");
      return;
    }

    setPaymentStatus("Processing payment...");

    try {
      const response = await axios.post('http://localhost:5000/api/checkout/payment-intent', {
        amount: totalPrice * 100, // Convert totalPrice to cents
      });
      const { clientSecret } = response.data;

      if (!stripe || !elements) {
        setPaymentStatus('Stripe.js has not loaded yet.');
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
            address: {
              line1: address,
            },
          },
        },
      });

      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful!');
        setShowSuccessModal(true); // Show the success modal after successful payment
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus('Payment failed. Please try again.');
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false); // Close the modal
    navigate('/'); // Redirect to home page after closing the modal
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

        {/* Right Section (Payment Form) */}
        <div className="rental-summary">
          <h3>Payment</h3>
          <h4>Total Price: {totalPrice} Npr</h4>
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-4">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="card-element">Card Information</label>
              <CardElement />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Payment
            </button>
          </form>

          {paymentStatus && <p>{paymentStatus}</p>}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
        <div className="modal-content">
          <img src={success} alt="Success" className="modal-image" />
          <h2>Payment Successful!</h2>
          <p>Your payment has been processed successfully.</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
      
      )}

      <div className="you-may-like">
        <h2>You May Like</h2>
        <div className="recommended-bikes">
          {recommendedBikes.map((bike, index) => (
            <div key={index} className="bike-card">
              <img src={bike.bike_image} alt={bike.bike_name} />
              <div className="bike-card-info">
                <h3>{bike.bike_name}</h3>
                <p>{bike.description}</p>
                <p className="bike-price">{bike.price} Rs / Hr</p>
                <button>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payment;
