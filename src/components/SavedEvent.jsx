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
  // const [loading, setLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); 
  const [userJwt] = useUserAuthContext();
  const navigate = useNavigate();  // Initialise useNavigate

  // Function to format the event time
  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const time = date.toLocaleTimeString([], options);
    return time;
  };
  // Log the JWT to see if it's being loaded from localStorage
  useEffect(() => {
    console.log("User JWT in SavedEvent:", userJwt);
  }, [userJwt]);

  // Function to format the event date
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const event = localStorage.getItem("savedEvent");
    console.log("Loaded saved event from localStorage:", event);
    if (event) {
      try {
        const eventData = JSON.parse(event);
        setSavedEvent(eventData.data || eventData);
      } catch (error) {
        console.error("Error parsing event data from localStorage:", error);
        setErrorMessage("Failed to load event data.");
      }
    } else {
      setErrorMessage("No event found.");
    }
  }, []);

  const handleAttendance =  async (status) => {
    console.log("Status sent to the API: ", status)
    if (!userJwt?.token) {
      setErrorMessage("You need to be logged in to RSVP.");
      return;
    }
  
    setAttendanceStatus(status);
  
    const eventId = savedEvent._id;
    const apiUrl = `${import.meta.env.VITE_AUTH_API_URL}/rsvp/attending/${eventId}`;
  

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userJwt.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong.');
      }

      const data = await response.json();
      console.log("RSVP response:", data);

      if (!data.success) {
        setErrorMessage(data.message);
        return;
      }

      if (status === "yes") {
        setCalendarEvents((prevEvents) => [...prevEvents, savedEvent]);
        setTimeout(() => {
          navigate("/attending-page");
        }, 500); // 500ms delay before navigation
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    }
  };

if (!savedEvent) {
      console.log("No event to display");
      return <div> No event found. </div>
}
  const { eventName, description, eventDate, location, invited, theme } = savedEvent;

  return (
    <div className={`event-invite theme-${theme}`}>
      <h2>{eventName}</h2>
      <p>{description}</p>
      <p><strong>WHEN:</strong> {formatEventDate(eventDate)} at {formatEventTime(eventDate)}
      </p>
      <p><strong>WHERE:</strong> {location}</p>
      <p><strong>INVITED:</strong></p>
      {invited && invited.length > 0 ? (
        <ul>
          {invited.map((id, index) => (
            <li key={index}>{id}</li>
          ))}
        </ul>
      ) : (
        <p> No one invited to this event yet!</p>
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

