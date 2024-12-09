import React, { useState, useEffect } from "react";
import "../css/global.css"; 
import "../css/SavedEvent.css";


function SavedEvent() {
  const [savedEvent, setSavedEvent] = useState(null);

  useEffect(() => {
    // Retrieve saved event data from local storage
    const event = localStorage.getItem('savedEvent');
    if (event) {
      setSavedEvent(JSON.parse(event));  // Set the event data if found in local storage
    }
  }, []);

  if (!savedEvent) {
    return <div>No event found. Please create an event first.</div>;
  }

  // Apply the saved theme to the event invite
  const { title, description, when, where, bring, theme } = savedEvent;

  return (
    <div className={`event-invite theme-${theme}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p><strong>WHEN:</strong> {when}</p>
      <p><strong>WHERE:</strong> {where}</p>
      <p><strong>BRING:</strong> {bring}</p>
    </div>
  );
}

export default SavedEvent;
