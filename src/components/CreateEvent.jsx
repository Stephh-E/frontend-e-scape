import React, { useState } from 'react';
import './CreateEvent.css';


const CreateEvent = () => {
    const [eventDetails, setEventDetails] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
      });
      const [image, setImage] = useState(null);
      const [rsvpOption, setRsvpOption] = useState("");
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };

return (
    <div className="search-events-container">
        <h1> Create New Event </h1>

        <div className="form-group">
            <label> Event Title</label>
            <input 
                type="text"
                name="title"
          value={eventDetails.title}
          onChange={handleInputChange}
          placeholder="Enter event title"
        />
    </div>

    <div className="form-section">
        <label>Event Date</label>
        <input
          type="date"
          name="date"
          value={eventDetails.date}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-section">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={eventDetails.location}
          onChange={handleInputChange}
          placeholder="Enter location"
        />
      </div>

      <div className="form-section">
        <label>Description</label>
        <textarea
          name="description"
          value={eventDetails.description}
          onChange={handleInputChange}
          placeholder="Enter event description"
        />
      </div>

      <div className="form-section">
        <label>RSVP Options</label>
        <div className="rsvp-options">
          <button
            className={rsvpOption === "going" ? "active" : ""}
            onClick={() => handleRsvpChange("going")}
          >
            Going
          </button>
          <button
            className={rsvpOption === "maybe" ? "active" : ""}
            onClick={() => handleRsvpChange("maybe")}
          >
            Maybe
          </button>
          <button
            className={rsvpOption === "cantgo" ? "active" : ""}
            onClick={() => handleRsvpChange("cantgo")}
          >
            Can't Go
          </button>
        </div>
      </div>

      <button className="create-event-button">Create Event</button>
    </div>
  );
};

export default CreateEvent;

    
        
