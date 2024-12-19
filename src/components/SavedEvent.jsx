import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css"; 
import "../css/SavedEvent.css";


function SavedEvent() {
  const [savedEvent, setSavedEvent] = useState(null);
  // Track attendance status
  const [attendanceStatus, setAttendanceStatus] = useState(""); 
  // Store events for the calendar
  const [calendarEvents, setCalendarEvents] = useState([]); 
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    // Retrieve saved event data from local storage
    const event = localStorage.getItem("savedEvent");
    if (event) {
      setSavedEvent(JSON.parse(event)); 
    }
  }, []);

  const handleAttendance = (status) => {
    setAttendanceStatus(status);
    if (status === "attending") {
      // Add to calendar if the status is 'attending'
      setCalendarEvents((prevEvents) => [...prevEvents, savedEvent]);
      navigate("/attending-page"); 
    }
  };

  if (!savedEvent) {
    return <div>No event found.</div>;
  }

  // Apply the saved theme to the event invite
  const { title, description, when, where, bring, theme } = savedEvent;

  return (
    <div className={`event-invite theme-${theme}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p><strong>WHEN:</strong> {when}</p>
      <p><strong>WHERE:</strong> {where}</p>
      <p><strong>BRING:</strong> {bring}</p>

      {/* Attendance buttons */}
      <div className="attendance-buttons">
        <button
          className={attendanceStatus === "attending" ? "selected" : ""}
          onClick={() => handleAttendance("attending")}
        >
          Attending
        </button>
        <button
          className={attendanceStatus === "maybe" ? "selected" : ""}
          onClick={() => handleAttendance("maybe")}
        >
          Maybe
        </button>
        <button
          className={attendanceStatus === "can't-go" ? "selected" : ""}
          onClick={() => handleAttendance("can't-go")}
        >
          Can't Go
        </button>
      </div>
    </div>
  );
}

export default SavedEvent;

