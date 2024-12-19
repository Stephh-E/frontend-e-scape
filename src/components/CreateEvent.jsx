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
  const [userJwt] = useUserAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("userJwt in CreateEvent:", userJwt);
  }, [userJwt]);

  if (!userJwt) {
    return <div>Please log in to create an event.</div>;
  }


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
    const updatedValue = name === "invited" ? value.split(",").map(item => item.trim()) : value;
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
        // const result = await response.json();
        console.log("Event created successfully:", data);
        alert("Event Published Successfully!");
        navigate("/saved-event"); // Redirect after success
      } else {
        console.error("Failed to publish event", data);
        alert("Failed to publish event. Please try again.");
      }
    } catch (error) {
      console.error("Error publishing event:", error);
      alert("An error occurred while publishing the event.");
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
              placeholder="..."
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
        <button type="button" className="button publish-button" onClick={handlePublish}>PUBLISH</button>
      </div>
    </div>
  );
}

export default CreateEvent;

