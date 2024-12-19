import React, { useState, useEffect } from "react";
import "../css/global.css"; 
import "../css/SavedEvent.css";
import MyCalendar from "./MyCalendar";

function SavedEvent() {
  const [savedEvent, setSavedEvent] = useState(null);
  // Track attendance status
  const [attendanceStatus, setAttendanceStatus] = useState(""); 
  // Store events for the calendar
  const [calendarEvents, setCalendarEvents] = useState([]); 

  useEffect(() => {
    // Retrieve saved event data from local storage
    const event = localStorage.getItem("savedEvent");
    if (event) {
      setSavedEvent(JSON.parse(event)); 
    }
  }, []);

  const handleAttendance = (status) => {
    setAttendanceStatus(status);
    if (status === "going") {
      // Add to calendar if the status is 'going'
      setCalendarEvents((prevEvents) => [...prevEvents, savedEvent]);
    }
  };

  if (!savedEvent) {
    return <div>No event found. Please create an event first.</div>;
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
          className={attendanceStatus === "going" ? "selected" : ""}
          onClick={() => handleAttendance("going")}
        >
          Going
        </button>
      </div>

      {/* Display the selected status */}
      {attendanceStatus && (
        <p>
          <strong>Status:</strong> You are <em>{attendanceStatus}</em>.
        </p>
      )}

      {/* Render the calendar */}
      <MyCalendar events={calendarEvents} />
    </div>
  );
}

export default SavedEvent;

