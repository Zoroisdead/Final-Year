import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../theme/Header"; // Assuming the Header component is in the same folder

const ViewBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filter, setFilter] = useState(""); // State for filter

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get("https://66d728f9006bfbe2e6500b43.mockapi.io/test");
        setBikes(response.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  // Filter bikes based on search term and filter option
  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch = bike.bike_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "" || (filter === "active" && bike.status === "active") || (filter === "inactive" && bike.status === "inactive");
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <Header onSearch={setSearchTerm} onFilter={setFilter} />
      <h1 className="heading">View Bikes</h1>
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
          {filteredBikes.map((bike) => (
            <tr key={bike.id}>
              <td>{bike.bike_name}</td>
              <td>{bike.description}</td>
              <td>{bike.price}</td>
              <td>
                <img src={bike.bike_image} alt={bike.bike_name} width="150" height="100" />
              </td>
              <td>
                <Link to={`/admin/bike-management/edit/${bike.id}`} className="btn btn-primary">
                  Edit
                </Link>
                <button className="btn btn-danger">
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
