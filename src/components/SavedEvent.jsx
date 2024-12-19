import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css"; 
import "../css/SavedEvent.css";
import { useUserAuthContext } from "../contexts/UserAuthContextProvider";


function SavedEvent() {
  const [savedEvent, setSavedEvent] = useState(null);
  // Track attendance status
  const [attendanceStatus, setAttendanceStatus] = useState(""); 
  // Store events for the calendar
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); 
  const [userJwt] = useUserAuthContext();

  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    // Retrieve saved event data from local storage
    const event = localStorage.getItem("savedEvent");
    console.log("Saved event from localStorage:", event);
    if (event) {
      const eventData = JSON.parse(event);
      setSavedEvent(eventData.data);
    }
  }, []);

  const handleAttendance = (status) => {
    setAttendanceStatus(status);

    fetch(`${import.meta.env.VITE_AUTH_API_URL}/attending/${savedEvent.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt.token}`
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("RSVP response:", data);
  
        if (status === "yes") {
          // Add to calendar if the status is 'yes'
          setCalendarEvents((prevEvents) => [...prevEvents, savedEvent]);
          navigate("/attending-page");
        }
      })
      .catch((error) => {
        console.error("Error updating attendance status:", error);
      });
  };

  if (!savedEvent) {
    return <div>No event found.</div>;
  }

  const { eventName, description, eventDate, location, invited, theme } = savedEvent;

  return (
    <div className={`event-invite theme-${theme}`}>
      <h2>{eventName}</h2>
      <p>{description}</p>
      <p><strong>WHEN:</strong> {eventDate}</p>
      <p><strong>WHERE:</strong> {location}</p>
      <p><strong>INVITEES:</strong> {invited}</p>

      {/* Attendance buttons */}
      <div className="attendance-buttons">
        <button
          className={attendanceStatus === "yes" ? "selected" : ""}
          onClick={() => handleAttendance("yes")}
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
          className={attendanceStatus === "no" ? "selected" : ""}
          onClick={() => handleAttendance("no")}
        >
          Can't Go
        </button>
      </div>
    </div>
  );
}

export default SavedEvent;

