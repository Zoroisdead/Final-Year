import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get("https://66d728f9006bfbe2e6500b43.mockapi.io/test");
        setBikes(response.data); // Set fetched bikes data
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete bike with ID: ${id}?`)) {
      try {
        // Delete bike from the API
        await axios.delete(`https://66d728f9006bfbe2e6500b43.mockapi.io/test/${id}`);
        // Update the state to remove the deleted bike
        setBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== id));
        alert("Bike deleted successfully!");
      } catch (error) {
        console.error("Error deleting bike:", error);
        alert("Failed to delete bike. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>View Bikes</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bike Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.id}>
              <td>{bike.bike_name}</td>
              <td>{bike.description}</td>
              <td>{bike.price}</td>
              <td>
                <img src={bike.bike_image} alt={bike.bike_name} width="100" height="100" />
              </td>
              <td>
                <Link to={`/admin/bike-management/edit/${bike.id}`} className="btn btn-primary">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDelete(bike.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBikes;
