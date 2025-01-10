import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ExploreBikes() {
  const [bikes, setBikes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000); // Adjust max price to a high value to include all bikes
  const navigate = useNavigate(); // Use useNavigate hook for navigation

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

  // Filter bikes based on search query, selected type, and price range
  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch = bike.bike_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || bike.type === selectedType;
    const matchesPrice = bike.price >= minPrice && bike.price <= maxPrice;

    return matchesSearch && matchesType && matchesPrice;
  });

  // Log filtered bikes to check the filtering logic
  console.log("Filtered bikes:", filteredBikes);

  const handleRentNow = (bike) => {
    // Redirect to Rent.js page and pass bike details via state
    navigate("/rent", { state: { bike } });
  };

  return (
    <div>
      <Navbar />
      <section className="explore-header">
        <h1>Explore Our Bikes</h1>
        <p>Browse through a wide selection of bikes available for rent. Find your perfect ride today!</p>
      </section>
      <div className="explore-bikes-container">
        {/* Search and Filter combined */}
        <div className="search-filter-bar">
          <input
            type="text"
            placeholder="Search for a bike..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="filters">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-dropdown"
            >
              <option value="All">All Types</option>
              <option value="Mountain">Mountain Bike</option>
              <option value="Road">Road Bike</option>
              <option value="Electric">Electric Bike</option>
              <option value="Hybrid">Hybrid Bike</option>
              <option value="City">City Bike</option>
              <option value="Cruiser">Cruiser Bike</option>
            </select>

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
        </div>

        {/* Bike Cards */}
        <div className="bike-grid">
          {filteredBikes.map((bike) => (
            <div key={bike.id} className="bike-card">
              <img src={bike.bike_image} alt={bike.bike_name} className="bike-image" />
              <div className="bike-info">
                <h3>{bike.bike_name}</h3>
                <p>{bike.description}</p>
                <p className="price">${bike.price} per hour</p>
                <button className="rent-btn" onClick={() => handleRentNow(bike)}>
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreBikes;
