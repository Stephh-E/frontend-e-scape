import React, { useState } from "react";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventWhen, setEventWhen] = useState("");
  const [eventWhere, setEventWhere] = useState("");
  const [eventBring, setEventBring] = useState("");
  const [attendance, setAttendance] = useState("");

  return (
    <div className="create-event-container">
      <header className="create-event-header">
        <input
          type="text"
          placeholder="Event Title ..."
          className="event-title-input"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <button className="theme-button">Change Theme</button>
      </header>
      <main className="create-event-main">
        <div className="left-column">
          <textarea
            placeholder="Describe your event here..."
            className="event-description-input"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <div className="image-upload-placeholder">Add Image Placeholder</div>
        </div>
        <div className="right-column">
          <div className="event-details">
            <label>WHEN:</label>
            <input
              type="text"
              className="event-detail-input"
              value={eventWhen}
              onChange={(e) => setEventWhen(e.target.value)}
            />
            <label>WHERE:</label>
            <input
              type="text"
              className="event-detail-input"
              value={eventWhere}
              onChange={(e) => setEventWhere(e.target.value)}
            />
            <label>BRING:</label>
            <input
              type="text"
              className="event-detail-input"
              value={eventBring}
              onChange={(e) => setEventBring(e.target.value)}
            />
          </div>
          <div className="image-upload-placeholder">Add Image Placeholder</div>
        </div>
      </main>
      <footer className="create-event-footer">
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
        <div className="action-buttons">
          <button className="save-button">Save</button>
          <button className="publish-button">Publish</button>
        </div>
      </footer>
    </div>
  );
};

export default CreateEvent;
