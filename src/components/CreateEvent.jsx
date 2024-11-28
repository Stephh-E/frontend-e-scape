import React, { useState } from "react";
import "../css/global.css"; 
import "../css/CreateEvent.css"; 

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventWhen, setEventWhen] = useState("");
  const [eventWhere, setEventWhere] = useState("");
  const [eventBring, setEventBring] = useState("");
  const [attendance, setAttendance] = useState("");

  return (
    <div className="create-event-container">
      <header className="grid-header">
        <input
          type="text"
          placeholder="Event Title ..."
          className="event-title-input"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <select className="theme-dropdown">
          <option>Change theme</option>
          <option>Theme 1</option>
          <option>Theme 2</option>
        </select>
      </header>
      <main className="grid-main">
        <div className="grid-left">
          <textarea
            placeholder="Describe your event here..."
            className="event-description-input"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <div className="image-placeholder">
          </div>
        </div>
        <div className="grid-right">
          <div className="event-details">
            <label>WHEN:</label>
            <input
              type="text"
              className="event-detail-input small"
              value={eventWhen}
              onChange={(e) => setEventWhen(e.target.value)}
            />
            <label>WHERE:</label>
            <input
              type="text"
              className="event-detail-input small"
              value={eventWhere}
              onChange={(e) => setEventWhere(e.target.value)}
            />
            <label>BRING:</label>
            <input
              type="text"
              className="event-detail-input small"
              value={eventBring}
              onChange={(e) => setEventBring(e.target.value)}
            />
          </div>
          <div className="attendance-options">
            <label>
              <input
                type="radio"
                value="attending"
                checked={attendance === "attending"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              Attending
            </label>
            <label>
              <input
                type="radio"
                value="maybe"
                checked={attendance === "maybe"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              Maybe!
            </label>
            <label>
              <input
                type="radio"
                value="cant-go"
                checked={attendance === "cant-go"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              Can't Go
            </label>
          </div>
        </div>
        <div className="grid-footer">
          <div className="buttons">
            <button className="save-button">Save</button>
            <button className="publish-button">Publish</button>
          </div>
          <div className="image-placeholder-footer">
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;


