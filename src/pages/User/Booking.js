import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Booking = () => {
  const { user } = useContext(UserContext);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Resolve `userId` from context or localStorage
  const userId = user?.id || JSON.parse(localStorage.getItem('user'))?.id || null;

  console.log("Resolved User ID:", userId);

  useEffect(() => {
    const fetchAcceptedBookings = async () => {
      if (!userId) {
        setError("User ID is required to fetch bookings.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/checkout/rented", {
          params: { userId },
        });

        console.log("API Response:", response.data);

        if (response.data?.data) {
          // Filter bookings where `status` is exactly 'Accepted'
          const acceptedBookingsData = response.data.data.filter(
            (booking) => booking.status?.trim() === "Accepted"
          );

          setAcceptedBookings(acceptedBookingsData);

          if (acceptedBookingsData.length === 0) {
            setError("No accepted bookings found.");
          }
        } else {
          setError("No accepted bookings found.");
        }
      } catch (err) {
        console.error("Error fetching accepted bookings:", err);
        setError(err.response?.data?.message || "Failed to fetch accepted bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcceptedBookings();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div className="user-profile">
        <div className="profile-sidebar">
          <h3>Manage My Account</h3>
          <ul className="usersiderbar">
            <Link to="/profile">My Profile</Link>
            <Link to="/booking">Booking</Link>
            <Link to="">Change Password</Link>
          </ul>
        </div>
        <div className="accepted-bookings-table" >
          <h2>My Accepted Bike Rentals</h2>

          {error && <div className="error-message">{error}</div>}

          {isLoading && <p>Loading...</p>}

          {!isLoading && !error && acceptedBookings.length === 0 && (
            <p>No accepted bookings found.</p>
          )}

          {acceptedBookings.length > 0 && (
            <table className="accepted-bookings-table">
              <thead>
                <tr>
                  <th>Bike Name</th>
                  <th>Bike Image</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {acceptedBookings.map((booking) => (
                  <tr key={booking.checkoutid}>
                    <td>{booking.bike_name}</td>
                    <td>
                      <img src={booking.bike_image} alt={booking.bike_name} width="100" />
                    </td>
                    <td>Npr{booking.price}</td>
                    <td className="status-accepted">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
