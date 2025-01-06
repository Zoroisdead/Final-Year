import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Validate inputs
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    // Check for manual admin login
    if (formData.email === 'admin' && formData.password === 'admin') {
      const adminUser = {
        email: 'admin',
        role: 'admin',
      };

      login(adminUser); // Update context with admin data
      localStorage.setItem('token', 'admin-token'); // Simulating a token for admin login

      setSuccessMessage('Admin login successful! Redirecting...');
      setTimeout(() => {
        navigate('/admin'); // Redirect to admin dashboard
      }, 1000);
      setLoading(false);
      return;
    }

    // API call for regular user login
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      login(user); // Update context with user data
      localStorage.setItem('token', token);

      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/'); // Redirect to home page
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Email or Password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-heading">Login</h1>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          {loading && <div className="loading-message">Logging in...</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email or Username</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email or username"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
            <p>
              <a href="/forgot-password">Forgot Password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
