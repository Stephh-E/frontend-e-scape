import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/CreateEvent.css";
import { useUserAuthContext } from "../contexts/UserAuthContextProvider";

function CreateEvent() {
  const [theme, setTheme] = useState("default");
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    eventDate: "",
    location: "",
    host: "", 
    invited: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userJwt] = useUserAuthContext();

  const navigate = useNavigate();


  useEffect(() => {
    // Dynamically update the theme
    const link = document.getElementById("theme-stylesheet");
    if (link) {
      link.href = `/themes/${theme}.css`;
    }
  }, [theme]);

  // Handle theme change
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  // Handle input field changes (title, description, etc.)
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "invited"){
      updatedValue = name === "invited" ? value.split(",").map(item => item.trim()) : value;
    }
    if (updatedValue.length === 0) {
      updatedValue = [];
    }

    setEventData({ ...eventData, [name]: updatedValue });
  };

  // Save the event
  const handleSave = () => {
    const savedEvent = { ...eventData, theme };
    localStorage.setItem("savedEvent", JSON.stringify(savedEvent)); // Save to localStorage
    navigate("/saved-event"); // Redirect to saved event page
  };

  // Handle publishing the event
  const handlePublish = async () => {
    if (!userJwt || !userJwt.token) {
      console.log("userJwt state: ", userJwt);
      alert("User is not authenticated.");
      return;
    }

    const hostId = userJwt.userId || null
    console.log("userJwt userId:", userJwt?.userId);
    const { eventName, description, eventDate, location, invited } = eventData;
    const eventDataToSend = {
      eventName,
      description,
      eventDate,
      location,
      host: hostId,
      invited,
    };

    console.log("Event data to send:", eventDataToSend);

    setLoading(true);
    setErrorMessage("");

    try {
      // Make a POST request to backend API
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${userJwt.token}`
        },
        body: JSON.stringify(eventDataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Event created successfully:", data);
        navigate("/saved-event");
      } else {
        console.error("Failed to publish event", data);
        setErrorMessage(data.message || "Failed to publish event. Please try again.");
      }
    } catch (error) {
      console.error("Error publishing event:", error);
      setErrorMessage("An error occurred while publishing the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <div className="header">
        <input
          type="text"
          placeholder="Event Title ..."
          className="event-title"
          name="eventName"
          value={eventData.eventName}
          onChange={handleInputChange}
        />
        <select
          className="theme-selector"
          value={theme}
          onChange={handleThemeChange}
        >
          <option value="default">Default Theme</option>
          <option value="halloween">Halloween</option>
          <option value="spiderman">Spiderman</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
        </select>
      </div>
      <div className="main-content">
        <textarea
          className="event-description"
          placeholder="Describe your event here..."
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
        ></textarea>
        <div className="details">
          <div className="input-group">
            <label>WHEN:</label>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>WHERE:</label>
            <input
              type="text"
              placeholder="..."
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>INVITE FRIENDS:</label>
            <input
              type="text"
              placeholder="..."
              name="invited"
              value={eventData.invited || []}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button type="button" className="button save-button" onClick={handleSave}>SAVE</button>
        
        <button
          type="button"
          className="button publish-button"
          onClick={handlePublish}
        >
          {loading ? "Publishing..." : "PUBLISH"}
        </button>
      </div>

      {/* Display error message if there is any */}
      {errorMessage && (
        <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default CreateEvent;

