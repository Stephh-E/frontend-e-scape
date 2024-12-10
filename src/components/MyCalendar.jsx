import "../css/global.css";
import "../css/MyCalendar.css";
import "add-to-calendar-button";
import React, { useEffect, useState } from "react";
import { google } from "calendar-link";
import { ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import moment from "moment-timezone";
import "@schedule-x/theme-default/dist/index.css";

function Calendar() {
  const [savedEvent, setSavedEvent] = useState(null);

  useEffect(() => {
    // Fetch the saved event from localStorage
    const event = localStorage.getItem("savedEvent");
    if (event) {
      const parsedEvent = JSON.parse(event);
  
      // Ensure 'when' is in ISO format (if it is not already)
      const validDate = new Date(parsedEvent.when);
      if (!isNaN(validDate.getTime())) {
        parsedEvent.when = validDate.toISOString(); // Convert to ISO string
      }
  
      console.log("Parsed event when:", parsedEvent.when);  // Log to check if it's in ISO format
  
      // Convert `when` field to Sydney time and format it for Google Calendar
      const sydneyTimeZone = "Australia/Sydney";
      const sydneyDate = moment.tz(parsedEvent.when, sydneyTimeZone).format();
      parsedEvent.when = sydneyDate;
  
      console.log("Converted Sydney time:", parsedEvent.when); // Log to check Sydney time

      setSavedEvent(parsedEvent);
    } else {
      console.log("No saved event found in localStorage");
    }
  }, []);

  // Debugging: Check if savedEvent is properly set
  if (!savedEvent) {
    console.log("savedEvent is null or undefined.");
    return <div>No events found. Please create and save an event first.</div>;
  }

  console.log("Rendering with saved event:", savedEvent); // Log to check if savedEvent is being set properly

  // Transform the savedEvent into the format required by ScheduleXCalendar
  const calendarEvent = {
    id: "1", // Unique ID for the event
    title: savedEvent.title || "Untitled Event",
    description: `${savedEvent.description || ""} - Bring: ${savedEvent.bring || "Nothing specified"}`,
    start: savedEvent.when, // Expecting ISO 8601 datetime format
    location: savedEvent.where || "No location specified",
  };

  console.log("Calendar event:", calendarEvent); // Log to check the final event format

  const googleUrl = google({
    title: savedEvent.title,
    description: savedEvent.description,
    start: savedEvent.when,
    location: savedEvent.where,
  });

  // Define views for the calendar
  const views = [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ];

  return (
    <div>
      <h2>Your Calendar</h2>
      {/* Display the ScheduleXCalendar with the saved event */}
      <div className="calendar-container">
        <ScheduleXCalendar events={[calendarEvent]} views={views} />
      </div>
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
