import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBicycle, FaTruck, FaSignOutAlt, FaMotorcycle, FaAddressBook, FaPen, FaListAlt, FaAvianex, FaTimes, FaClock } from "react-icons/fa"; // Importing icons
import logo from '../../../assets/bikelogo.png'; // Assuming this is the correct path for the logo
import { FaPeace } from "react-icons/fa6";

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
        <li>
          <Link to="/admin/admindashboard">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>

        {/* Bike Management Section */}
        <li>
          <Link to="/admin/bike-management">
            <FaBicycle /> Bike Management
          </Link>
          <ul className="sidebar-sub-nav">
            <li><Link to="/admin/bike-management/add">  <FaPen />Add Bike</Link></li>
            <li><Link to="/admin/bike-management/view"> < FaListAlt/> View Bikes</Link></li>
            <li><Link to="/admin/bike-management/available">< FaClock/> Available Bikes</Link></li>
          </ul>
        </li>

        {/* Rented Bikes Section */}
        <li>
          <Link to="/admin/rented-bikes">
            <FaMotorcycle /> Rented Bikes
          </Link>
        </li>

        {/* Logout Button */}
        <li>
          <Link to="/login"  onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
