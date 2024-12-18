import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/NewEvent.css";  

const NewEvent = () => {
  const navigate = useNavigate();

  const handleCreateNewEvent = () => {
    navigate("/create");  // Navigate to the event creation page
  };

  const handleSeeMyEvents = () => {
    navigate("/myevents");  // Navigate to the user's events page
  };

  return (
    <div className="new-event-container">
      <div className="new-event-content">
        <h1 className="new-event-title">New Event</h1>
        <p className="new-event-description">
          Yay you’re hosting an event!! Get started below, 
          <br></br>
          our templates and guides are waiting for you...
        </p>

        <div className="new-event-buttons">
          <button className="button create-new" onClick={handleCreateNewEvent}>
            Create New
          </button>
          <button className="button see-my-events" onClick={handleSeeMyEvents}>
            See My Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
