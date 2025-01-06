import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/bikelogo.png'; // Assuming this is the correct path for the logo

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication data (e.g., token, user session)
    localStorage.removeItem("authToken"); // Example: remove auth token from localStorage
    
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Bike Logo" className="sidebar-logo" />
      </div>

      <ul className="sidebar-nav">
        <li><Link to="/admin/admindashboard">Dashboard</Link></li>
        
        {/* Bike Management Section */}
        <li>
          <Link to="/admin/bike-management">Bike Management</Link>
          <ul className="sidebar-sub-nav">
            <li><Link to="/admin/bike-management/add">Add Bike</Link></li>
            <li><Link to="/admin/bike-management/view">View Bikes</Link></li>
            <li><Link to="/admin/bike-management/available">Available Bikes</Link></li>
          </ul>
        </li>

        {/* Rented Bikes Section */}
        <li><Link to="/admin/rented-bikes">Rented Bikes</Link></li>

        {/* Logout Button */}
        <li>
          <Link to= "/login" className="btn btn-danger" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
