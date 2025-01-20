import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import { UserContext } from "../../UserContext"; // Import UserContext

function ExploreBikes() {
  const [bikes, setBikes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0); // Min price state
  const [maxPrice, setMaxPrice] = useState(5000); // Max price state
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const { user } = useContext(UserContext); // Retrieve user from context

  // Fetch bike data from mock API
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get("https://66d728f9006bfbe2e6500b43.mockapi.io/test");
        console.log("Fetched bikes data:", response.data); // Log the fetched data
        setBikes(response.data); // Populate bikes state with fetched data
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  // Filter bikes based on search query and price range
  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch = bike.bike_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = bike.price >= minPrice && bike.price <= maxPrice; // Filter by price range

    return matchesSearch && matchesPrice; // Ensure both conditions are met
  });

  // Log filtered bikes to check the filtering logic
  console.log("Filtered bikes:", filteredBikes);

  const handleRentNow = (bike) => {
    // Redirect to Rent.js page and pass bike details via state
    navigate("/rent", { state: { bike, userId: user?.id } }); // Pass userId
  };

  return (
    <div>
      <Navbar />
      <section className="explore-header">
        <h1>Explore Our Bikes</h1>
        <p>Browse through a wide selection of bikes available for rent. Find your perfect ride today!</p>
      </section>
      <div className="explore-bikes-container">
        {/* Search bar and price filters */}
        <div className="search-filter-bar">
          <input
            type="text"
            placeholder="Search for a bike..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="price-filter">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="price-input"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-input"
            />
          </div>
        </div>

        {/* Bike Cards */}
        <div className="bike-grid">
          {filteredBikes.map((bike) => (
            <div key={bike.id} className="bike-card">
              <img src={bike.bike_image} alt={bike.bike_name} className="bike-image" />
              <div className="bike-info">
                <h3>{bike.bike_name}</h3>
                <p>{bike.description}</p>
                <p className="price">Npr {bike.price}</p>
                <button className="rent-btn" onClick={() => handleRentNow(bike)}>
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreBikes;
