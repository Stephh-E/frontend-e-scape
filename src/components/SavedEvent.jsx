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
  const [errorMessage, setErrorMessage] = useState(null); 
  const [userJwt] = useUserAuthContext();

  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const event = localStorage.getItem("savedEvent");
    console.log("Loaded saved event from localStorage:", event);
    if (event) {
      try {
        const eventData = JSON.parse(event);
        console.log("Parsed eventData:", eventData);
        if (eventData.data){
          setSavedEvent(eventData.data);
        } else {
          setSavedEvent(eventData);
        }
      } catch (error) {
        console.error("Error parsing event data from localStorage:", error);
        setErrorMessage("Failed to load event data.");
      }
    } else {
      setErrorMessage("No event found.");
    }
  }, []);


  const handleAttendance = (status) => {
    setAttendanceStatus(status);

    const eventId = savedEvent._id;

    if (!savedEvent || !userJwt?.token){
      setErrorMessage("Event or user authentication is missing.");
      return;
    }

    fetch(`${import.meta.env.VITE_AUTH_API_URL}/rsvp/attending/${eventId}`, {
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

        if (data.success === false) {
          setErrorMessage(data.message);
          return;
        }
  
        if (status === "yes") {
          setCalendarEvents((prevEvents) => [...prevEvents, savedEvent]);
          navigate("/attending-page");
        }
      })
      .catch((error) => {
        console.error("Error updating attendance status:", error);
        setErrorMessage(error.message)
      });
  };

  if (!savedEvent) {
    console.log("No event to display, savedEvent is null or undefined.");
    return <div>No event found.</div>;
  }

  const { eventName, description, eventDate, location, invited, theme } = savedEvent;

  return (
    <div className={`event-invite theme-${theme}`}>
      <h2>{eventName}</h2>
      <p>{description}</p>
      <p><strong>WHEN:</strong> {eventDate}</p>
      <p><strong>WHERE:</strong> {location}</p>
      <p><strong>INVITEES:</strong></p>
      {invited && invited.length > 0 ? (
        <ul>
          {invited.map((id, index) => (
            <li key={index}>{id}</li>
          ))}
        </ul>
      ) : (
        <p>No one invited to this event yet!</p>
      )}

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
        <div>
            {/* Display error message */}
          {errorMessage && (
            <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default SavedEvent;

