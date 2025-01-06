import React from "react";
import Navbar from "../../components/Navbar";
import Mission from"../../assets/ourmission.jpg";
import Values from"../../assets/Values.jpg";
import speed from "../../assets/ishowspeed.jpg";
import hamal from "../../assets/hamal.jpg";
import horaa from "../../assets/horaa.jpg";

const About = () => {
  return (
    <div className="about-container">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <section className="about-header">
        <h1>About Us</h1>
        <p className="about-description">
          We are a team of passionate individuals dedicated to delivering premium products and exceptional services to our customers worldwide.
        </p>
      </section>

      {/* Mission and Values Section */}
      <div className="about-content">
        {/* Mission Section */}
        <section className="about-mission">
          <div className="about-mission-content">
            <div className="about-mission-image">
              <img src={Mission} alt="Mission" />
            </div>
            <div className="about-mission-text">
              <h2>Our Mission</h2>
              <p>
                To inspire exploration and adventure by providing high-quality bikes, gear, and travel experiences. We believe in transforming lives through the joy of discovery.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values">
          <div className="about-values-content">
            <div className="about-values-text">
              <h2>Our Values</h2>
              <ul>
                <li><strong>Transparency:</strong> We prioritize honesty in every interaction.</li>
                <li><strong>Sustainability:</strong> Our practices focus on reducing our ecological footprint.</li>
                <li><strong>Quality:</strong> We ensure excellence in every product and service.</li>
                <li> <strong>Innovation:</strong> Driving progress through cutting-edge technologies.</li>
              </ul>
            </div>
            <div className="about-values-image">
              <img src={Values} alt="Values" />
            </div>
          </div>
        </section>
      </div>

      {/* Team Section */}
      <section className="about-team">
        <h2>Meet The Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={speed} alt="John Doe" />
            <h3>Ishowspeed</h3>
            <p>CEO & Founder</p>
            <p> Ishowspeed leads our company with a vision for the future and a passion for innovation.</p>
          </div>

          <div className="team-member">
            <img src={hamal} alt="Jane Smith" />
            <h3>Rajesh Hamal</h3>
            <p>Creative Director</p>
            <p>Rajesh ensures our designs are not only functional but also visually stunning.</p>
          </div>

          <div className="team-member">
            <img src= {horaa} alt="Mark Lee" />
            <h3>Sanjan Gautam</h3>
            <p>Operations Head</p>
            <p>Sanjan oversees our operations to deliver seamless customer experiences.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>If you have any questions, we’re here to help.</p>
        <p>Email: <a href="mailto:Rentalbike@example.com">Rentalbike@example.com</a></p>
      </section>
    </div>
  );
};

export default About;
