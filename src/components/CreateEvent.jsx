import React from "react";
import "../css/global.css"; 
import "../css/CreateEvent.css"; 


function CreateEvent() {
  return (
    <div className="create-event-container">
      <div className="header">
        <input type="text" placeholder="Event Title ..." className="event-title" />
        <select className="theme-selector">
          <option>Change Theme</option>
          {/* Add more theme options here */}
        </select>
      </div>
      <div className="main-content">
        <textarea className="event-description" placeholder="Describe your event here..."></textarea>
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
      </div>
      <div className="footer">
        <div className="attendance">
          <label><input type="checkbox" /> ATTENDING</label>
          <label><input type="checkbox" /> MAYBE!</label>
          <label><input type="checkbox" /> CAN'T GO</label>
        </div>
        <div className="button">
          <button className="save-buttton">SAVE</button>
          <button className="publish-button">PUBLISH</button>
        </div>
        <div className="extra-image">
          <img src="/placeholder-image.png" alt="Image" />
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
