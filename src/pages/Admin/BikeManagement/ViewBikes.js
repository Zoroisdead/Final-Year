import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViTable from "../../../components/ViTable";
import { getAllBikes } from "../../../services/bikeAPI"; // Import the getAllBikes function

const ViewBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const fetchedBikes = await getAllBikes(); // Fetch bikes from the server
        setBikes(fetchedBikes);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  const tableHeaders = [
    { label: "Bike Name", key: "bike_name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "price" },
    { label: "Image", key: "bike_image", type: "image" }, // Display the bike image
  ];

  const actions = [
    {
      name: "Edit",
      link: "/admin/bike-management/edit",
      className: "btn btn-primary",
    },
    {
      name: "Delete",
      link: "/admin/bike-management/delete",
      className: "btn btn-danger",
    },
  ];

  return (
    <div>
      <h1>View Bikes</h1>
      <ViTable data={bikes} header={tableHeaders} actions={actions} />
    </div>
  );
};

export default ViewBikes;
