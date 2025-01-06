import React from "react";
import { useLocation } from "react-router-dom"; // Hook to access event data passed via Link
import Navbar from "../../components/Navbar";

const EventInfo = () => {
  const location = useLocation();
  const { state } = location || {};
  const event = state?.event || {}; // Safely access event data

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Event Details Section */}
      <div className="event-info-section">
        <h1 className="event-title">{event.title || "Event Details"}</h1>

        {/* Event Image */}
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="event-info-image"
          />
        )}

        {/* Event Details */}
        <div className="event-details-container">
          <p className="event-meta">
            <strong>Date:</strong> {event.startDay} - {event.endDay}{" "}
            {event.month}, {event.year}
          </p>
          <p className="event-meta">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="event-meta">
            <strong>Type:</strong> {event.type}
          </p>
          <p className="event-meta">
            <strong>Category:</strong> {event.category}
          </p>

          {/* Additional Details */}
          <div className="event-description">
            <p>
              This event will take place in {event.location}. It is categorized
              as a <strong>{event.type}</strong> event and is part of the{" "}
              <strong>{event.category}</strong> series. Join us for an
              unforgettable adventure!
            </p>
          </div>
        </div>

        {/* Return Link */}
        <div className="back-link">
          <a href="/events" className="back-button">
            &larr; Back to Events
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
