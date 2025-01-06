import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Assuming the Navbar component exists
import email from "../../assets/email.jpg";
import address from "../../assets/address.jpg";
import phone from "../../assets/phone.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or email)
    console.log(formData);
  };

  return (
    <div className="contact-container">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p className="contact-description">
          We are here to assist you. Reach out to us anytime and we’ll get back to you as soon as possible.
        </p>
      </section>
      <section className="contact-info">
  <h2>Contact Information</h2>
  <p>If you have any questions or need assistance, feel free to reach out to us directly:</p>
  
  <div className="contact-details-container">
    {/* Email Card */}
    <div className="contact-card">
      <img
        src={email}
        alt="Email Icon"
        className="contact-card-image"
      />
      <div className="contact-card-details">
        <h3>Email Us</h3>
        <p>We are here to assist you with your inquiries.</p>
        <p>Email: <strong>rentalbike@example.com</strong></p>
      </div>
    </div>

    {/* Phone Card */}
    <div className="contact-card">
      <img
        src={phone}
        alt="Phone Icon"
        className="contact-card-image"
      />
      <div className="contact-card-details">
        <h3>Call Us</h3>
        <p>Have a question? Give us a call.</p>
        <p>Phone: <strong>(+977) 9840123569</strong></p>
      </div>
    </div>

    {/* Address Card */}
    <div className="contact-card">
      <img
        src={address}
        alt="Location Icon"
        className="contact-card-image"
      />
      <div className="contact-card-details">
        <h3>Visit Us</h3>
        <p>Come to our office and meet us in person.</p>
        <p>Address: <strong>Kumaripati, Nepal</strong></p>
      </div>
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

    </div>
  );
};

export default Contact;
