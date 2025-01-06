// src/pages/Home/Home.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import snap from "../../assets/snap.png";
import eco from "../../assets/environmentalism.png";
import affordable from "../../assets/saving-money.png";
import choose from "../../assets/target.png";
import rent from "../../assets/two.png";
import ride from "../../assets/ride.png";

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to handle form submission, such as sending the data to an API
    alert('Form submitted!');
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Ride the future, Rent a Bike Today</h1>
          <p>Experience the joy of riding with our affordable and eco-friendly bike rentals.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>


      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-container">
          <div className="feature-item">
            <img src={snap} alt="Easy Rentals" className="feature-icon" />
            <h3>Easy Rentals</h3>
            <p>Pick your bike in minutes and start exploring the city with ease.</p>
          </div>
          <div className="feature-item">
            <img src={eco} alt="Eco-Friendly" className="feature-icon" />
            <h3>Eco-Friendly</h3>
            <p>Make a positive impact on the environment by using sustainable transportation.</p>
          </div>
          <div className="feature-item">
            <img src={affordable} alt="Affordable" className="feature-icon" />
            <h3>Affordable Prices</h3>
            <p>Get the best rental prices without compromising on quality.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
          <img src={choose} alt="Affordable" className="feature-icon" />
            <h3>Choose a Bike</h3>
            <p>Select the perfect bike for your journey from our wide selection.</p>
          </div>
          <div className="step">
          <img src={rent} alt="Affordable" className="feature-icon" />
            <h3>Rent Online</h3>
            <p>Book your bike quickly and securely through our online platform.</p>
          </div>
          <div className="step">
          <img src={ride} alt="Affordable" className="feature-icon" />
            <h3>Ride & Explore</h3>
            <p>Enjoy your ride and explore the beauty of the city at your own pace.</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="events-list">
          <div className="event-item">
            <h3>City Ride Challenge</h3>
            <p>Join us for an exciting city-wide bike ride challenge! Bring your friends and compete for fun prizes.</p>
            <p className="event-date">Date: January 15, 2025</p>
          </div>
          <div className="event-item">
            <h3>Eco Ride Festival</h3>
            <p>Celebrate Earth Day with a group ride through the most scenic bike routes in the city.</p>
            <p className="event-date">Date: April 22, 2025</p>
          </div>
        </div>
      </section>

       {/* Contact Form */}
       <section className="contact-form">
        <div className="form-container">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Ride?</h2>
        <p>Join thousands of happy riders. Rent a bike today!</p>
        <button className="cta-button">Rent a Bike Now</button>
      </section>
    </div>
  );
};

export default Home;
