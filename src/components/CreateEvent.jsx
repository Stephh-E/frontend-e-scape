import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/CreateEvent.css";

function CreateEvent() {
  const [theme, setTheme] = useState("default");
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    eventDate: "",
    location: "",
    host: "",
    invited: "",
  });

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
    setEventData({ ...eventData, [name]: value });
  };

  // Save the event
  const handleSave = () => {
    const savedEvent = { ...eventData, theme };
    localStorage.setItem("savedEvent", JSON.stringify(savedEvent)); // Save to localStorage
    navigate("/saved-event"); // Redirect to saved event page
  };

  // Handle publishing the event
  const handlePublish =  async () => {
    try {
      // Prepare data to send to the backend
      const eventDataToSend = { ...eventData, theme };

      // Make a POST request to backend API
      const response = await fetch("http://localhost:3000/event/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventDataToSend),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Event created successfully:", result);
          alert("Event Published Successfully!");
          navigate("/saved-event"); // Redirect after success
        } else {
          console.error("Failed to publish event");
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
          value={eventData.title}
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
              value={eventData.when}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>WHERE:</label>
            <input
              type="text"
              placeholder="..."
              name="where"
              value={eventData.where}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>BRING:</label>
            <input
              type="text"
              placeholder="..."
              name="bring"
              value={eventData.bring}
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
