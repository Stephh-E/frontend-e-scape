import "../css/global.css";
import "../css/MyCalendar.css";
import "add-to-calendar-button";
import React from "react";
import { google } from "calendar-link";

function Calendar() {
  const event = {
    title: "My Event",
    description: "This is a test event.",
    start: "2024-12-10T08:00:00", // ISO 8601 format
  };

  const googleUrl = google(event); // Generate the Google Calendar link

  return (
    <div>
      <button
        id="addToCalendar"
        onClick={() => window.open(googleUrl, "_blank")}
      >
        Add to Google Calendar
      </button>
    </div>
  );
}

export default Calendar;
