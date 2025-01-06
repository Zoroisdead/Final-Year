// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import profile from '../assets/userprofile.png';
import bikelogo from '../assets/bikelogo.png';
import cart from '../assets/trolley.png';
const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={bikelogo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/explore-bikes">Explore Bikes</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="profile-btn">
              <img src={profile}  alt="User Profile" className="profile-icon" />
            </Link>
           
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
