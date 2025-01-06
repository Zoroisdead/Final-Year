import { useState, useEffect } from "react";

const RentedBikes = () => {
  const [rentedBikes, setRentedBikes] = useState([]);

  useEffect(() => {
    // Replace with actual API call or logic to fetch rented bikes
    const fetchedRentedBikes = [
      {
        id: 1,
        bikeName: "Bike A",
        renterName: "John Doe",
        rentDuration: "3 days",
        startDate: "2024-12-01",
        endDate: "2024-12-03",
        rentPrice: 300,
      },
      {
        id: 2,
        bikeName: "Bike B",
        renterName: "Jane Smith",
        rentDuration: "5 days",
        startDate: "2024-12-02",
        endDate: "2024-12-07",
        rentPrice: 500,
      },
    ];
    setRentedBikes(fetchedRentedBikes);
  }, []);

  const handleViewDetails = (bikeId) => {
    // Placeholder for logic
    console.log(`View details for bike ID: ${bikeId}`);
  };

  const handleExtendRent = (bikeId) => {
    // Placeholder for logic
    console.log(`Extend rent for bike ID: ${bikeId}`);
  };

  const handleReturnBike = (bikeId) => {
    // Placeholder for logic
    console.log(`Return bike with ID: ${bikeId}`);
  };

  return (
    <div>
      <h1>Rented Bikes</h1>
      {rentedBikes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bike Name</th>
              <th>Renter Name</th>
              <th>Rent Duration</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Rent Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentedBikes.map((bike) => (
              <tr key={bike.id}>
                <td>{bike.bikeName}</td>
                <td>{bike.renterName}</td>
                <td>{bike.rentDuration}</td>
                <td>{bike.startDate}</td>
                <td>{bike.endDate}</td>
                <td>${bike.rentPrice}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleViewDetails(bike.id)}>
                    View Details
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleExtendRent(bike.id)}>
                    Extend Rent
                  </button>
                  <button className="btn btn-danger" onClick={() => handleReturnBike(bike.id)}>
                    Return Bike
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bikes are currently rented.</p>
      )}
    </div>
  );
};

export default RentedBikes;
