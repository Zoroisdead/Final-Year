// src/pages/BikeManagement/ViewBikes.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViTable from "../../../components/ViTable";
const ViewBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    // Logic to fetch bikes (API call or local storage)
    const fetchedBikes = [
      { id: 1, name: "Bike A", model: "Model A", price: "1000", color: "Red", year: "2020" },
      { id: 2, name: "Bike B", model: "Model B", price: "1200", color: "Blue", year: "2021" },
      { id: 3, name: "Bike C", model: "Model C", price: "1500", color: "Black", year: "2022" },
    ];
    setBikes(fetchedBikes);
  }, []);

  const tableHeaders = [
    { label: "Bike Name", key: "name" },
    { label: "Model", key: "model" },
    { label: "Price", key: "price" },
    { label: "Color", key: "color" },
    { label: "Manufacture Year", key: "year" },
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
