import { useState, useEffect } from "react";


const AvailableBikes = () => {
  const [availableBikes, setAvailableBikes] = useState([]);

  useEffect(() => {
    // Fetch available bikes (replace with actual API call or logic)
    const fetchedAvailableBikes = [
      { id: 1, name: "Bike A", model: "Model A", color: "Red", price: "1000" },
      { id: 2, name: "Bike B", model: "Model B", color: "Blue", price: "1200" },
    ];
    setAvailableBikes(fetchedAvailableBikes);
  }, []);

  return (
    <div className="available-bikes-container">
      <h1 className="available-bikes-header">Available Bikes</h1>
      <ul className="bike-list">
        {availableBikes.map((bike) => (
          <li key={bike.id} className="bike-list-item">
            <div className="bike-details">
              <span className="bike-name">{bike.name}</span>
              <span className="bike-model">Model: {bike.model}</span>
              <span className="bike-color">Color: {bike.color}</span>
              <span className="bike-price">Price: ${bike.price}</span>
            </div>
            <div className="bike-action">
              {/* <button className="btn">Book Now</button> */}
              <button className="btn-danger">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableBikes;
