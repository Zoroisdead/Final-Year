import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../../components/Navbar"; // Import Navbar
import mountainEvent1 from "../../assets/mountain-event1.jpg";
import mountainEvent2 from "../../assets/mountain-event2.jpg";
import mountainEvent3 from "../../assets/mountain-event3.jpg";

const Events = () => {
  const eventsData = [
    {
      id: 1,
      image: mountainEvent1,
      year: "2024",
      startDay: "25",
      endDay: "2",
      month: "Oct",
      title: "Cultuur en Mountainbike Reis Nepal",
      location: "Kathmandu",
      type: "mtb",
      category: "holiday",
      link: "#",
    },
    {
      id: 2,
      image: mountainEvent2,
      year: "2024",
      startDay: "10",
      endDay: "16",
      month: "Nov",
      title: "Hiking Adventure in Langtang",
      location: "Langtang Valley",
      type: "hiking",
      category: "adventure",
      link: "#",
    },
    {
      id: 3,
      image: mountainEvent3,
      year: "2024",
      startDay: "5",
      endDay: "12",
      month: "Dec",
      title: "Annapurna Base Camp Trek",
      location: "Pokhara",
      type: "trekking",
      category: "holiday",
      link: "#",
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Event Header */}
      <div className="event-header">
        <h1 >Events</h1>
        <p className="event-header-subtitle">
          Join our carefully curated events designed to inspire adventure and exploration. 
          Whether you seek thrilling mountain bike rides or tranquil hiking trails, we have something special for you.
        </p>
      </div>

      {/* Upcoming Events Section */}
      <div className="events-section">
        <h2 className="events-heading">Upcoming Events</h2>
        <div className="events-container">
          {eventsData.map((event) => (
            <div key={event.id} className="event-card">
              {/* Event Image */}
              <img src={event.image} alt={event.title} className="event-image" />

              {/* Event Content */}
              <div className="event-details">
                <div className="event-date">
                  <span className="year">{event.year}</span>
                  <div className="days">
                    {event.startDay} - {event.endDay}
                    <span className="month">{event.month}</span>
                  </div>
                </div>

                <div className="event-info">
                  {/* Link to EventInfo page with event data */}
                  <Link
                    to={{
                      pathname: "/eventsinfo", // Link to the EventsInfo page
                      state: { event }, // Pass event data as state
                    }}
                    className="event-title"
                  >
                    {event.title}
                  </Link>
                  <p className="event-meta">
                    <span role="img" aria-label="location">📍</span> {event.location} &nbsp;
                    <span role="img" aria-label="activity">🚲</span> {event.type} - {event.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
