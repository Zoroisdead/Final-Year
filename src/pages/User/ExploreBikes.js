import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Bike1 from '../../assets/Bike1.jpg';
import Bike2 from '../../assets/Bike2.jpg';
import Bike3 from '../../assets/Bike3.jpg';
import Bike4 from '../../assets/Bike4.jpg';
import Bike5 from '../../assets/Bike5.jpg';
import Bike6 from '../../assets/Bike6.jpg';

function ExploreBikes() {
  const bikes = [
  { id: 1, name: 'Mountain Bike', image: Bike1, price: 20, description: 'Perfect for rugged terrains and outdoor adventures.' },
  { id: 2, name: 'Road Bike', image: Bike2, price: 15, description: 'Ideal for smooth city roads and long-distance rides.' },
  { id: 3, name: 'Electric Bike', image: Bike3, price: 25, description: 'Eco-friendly bike with electric assist for easy rides.' },
  { id: 4, name: 'Hybrid Bike', image: Bike4, price: 18, description: 'A mix of road and mountain bike features for versatile riding.' },
  { id: 5, name: 'City Bike', image: Bike5, price: 12, description: 'Lightweight and easy to navigate in the city.' },
  { id: 6, name: 'Cruiser Bike', image: Bike6, price: 22, description: 'Comfortable bike for casual rides around town.' },
];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const navigate = useNavigate();  // Use useNavigate hook for navigation

  // Filter bikes based on search query, selected type, and price range
  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || bike.type === selectedType;
    const matchesPrice = bike.price >= minPrice && bike.price <= maxPrice;

    return matchesSearch && matchesType && matchesPrice;
  });

  const handleRentNow = (bike) => {
    // Redirect to Rent.js page and pass bike details via state
    navigate('/rent', { state: { bike } });
  };

  return (
    <div>
      <Navbar />
      <section className="explore-header">
  <h1>Explore Our Bikes</h1>
  <p>Browse through a wide selection of bikes available for rent. Find your perfect ride today!</p>
</section>
      <div className="explore-bikes-container">
        <h1>Explore Our Bikes</h1>
        <p>Browse through a wide selection of bikes available for rent.</p>

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
              <img src={bike.image} alt={bike.name} className="bike-image" />
              <h3>{bike.name}</h3>
              <p>{bike.description}</p>
              <p className="price">${bike.price} per hour</p>
              <button className="rent-btn" onClick={() => handleRentNow(bike)}>Rent Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreBikes;
