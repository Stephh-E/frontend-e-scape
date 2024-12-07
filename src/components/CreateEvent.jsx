import React, { useState} from "react";
import "../css/global.css";
import "../css/CreateEvent.css";

function CreateEvent() {
  const [theme, setTheme] = useState("default");
  
    // Handle theme change
    const handleThemeChange = (e) => {
      const selectedTheme = e.target.value;
      setTheme(selectedTheme);
  
    // Dynamically load the selected theme's CSS
    const link = document.getElementById("theme-stylesheet");
    if (link) {
      link.href = `/themes/${selectedTheme}.css`;
    }
  };
  
  
  
  return (
    <div className="create-event-container">
      <div className="header">
        <input
          type="text"
          placeholder="Event Title ..."
          className="event-title"
        />
        <select
          className="theme-selector"
          value={theme}
          onChange={handleThemeChange}
        >
          <option value="default">Default Theme</option>
          <option value="halloween">Halloween</option>
          <option value="Spiderman">Spiderman</option>
        </select>
      </div>
      <div className="main-content">
        <textarea
          className="event-description"
          placeholder="Describe your event here..."
        ></textarea>
        <div className="details">
          <div className="input-group">
            <label>WHEN:</label>
            <input type="text" placeholder="..." />
          </div>
          <div className="input-group">
            <label>WHERE:</label>
            <input type="text" placeholder="..." />
          </div>
          <div className="input-group">
            <label>BRING:</label>
            <input type="text" placeholder="..." />
          </div>
        </div>
        <div className="buttons">
          <button className=" button save-button">SAVE</button>
          <button className="button publish-button">PUBLISH</button>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;

