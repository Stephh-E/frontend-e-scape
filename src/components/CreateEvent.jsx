import React, { useState, useEffect} from "react";
import "../css/global.css";
import "../css/CreateEvent.css";

function CreateEvent() {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    // Dynamically update the theme CSS when the theme changes
    const link = document.getElementById("theme-stylesheet");
    if (link) {
      link.href = `/themes/${theme}.css`; // Update the href to load the selected theme
    }
  }, [theme]); // This effect runs whenever the `theme` state changes

  
    // Handle theme change
    const handleThemeChange = (e) => {
      const selectedTheme = e.target.value;
      setTheme(selectedTheme);
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
          <option value="spiderman">Spiderman</option>
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
          <button type="button" className="button save-button">SAVE</button>
          <button type="button" className="button publish-button">PUBLISH</button>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;

