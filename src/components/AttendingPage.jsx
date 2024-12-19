import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/AttendingPage.css";

function AttendingPage() {
    const navigate = useNavigate();
  
    // Retrieve the saved event from local storage
    const savedEvent = JSON.parse(localStorage.getItem("savedEvent"));
  
    if (!savedEvent) {
      return <div>No event found.</div>;
    }
  
    // Extract event details
    const { title, description, when, where } = savedEvent;
  
    // Create the Google Calendar URL with event details
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${encodeURIComponent(when)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(where)}`;
  
    return (
      <div className="attending-container">
        <h1>See you there!!!</h1>
        <button
          className="attending-button"
          onClick={() => window.location.href = googleCalendarUrl}
        >
          Click here
        </button>
        <p className="attending-note"> 
          To add this event to your calendar.
        </p>
      </div>
    );
  }
  
  export default AttendingPage;