import "../css/global.css";
import "../css/MyCalendar.css";
import "add-to-calendar-button";
import React, { useEffect, useState } from "react";
import { google } from "calendar-link";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";

// Set up the localizer for react-big-calendar 
const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [savedEvent, setSavedEvent] = useState(null);

  useEffect(() => {
    // Fetch the saved event from localStorage
    const event = localStorage.getItem("savedEvent");
    if (event) {
      const parsedEvent = JSON.parse(event);
  
      // Ensure 'when' is in ISO format 
      const validDate = new Date(parsedEvent.when);
      if (!isNaN(validDate.getTime())) {
        parsedEvent.when = validDate.toISOString(); // Convert to ISO string
      }
  
      console.log("Parsed event when:", parsedEvent.when);  // Log to check if it's in ISO format
  
      // Convert `when` field to Sydney time and format it for Google Calendar
      const sydneyTimeZone = "Australia/Sydney";
      const sydneyDate = moment.tz(parsedEvent.when, sydneyTimeZone).format();
      parsedEvent.when = sydneyDate;

      // Log to check Sydney time
      console.log("Converted Sydney time:", parsedEvent.when); 

      setSavedEvent(parsedEvent);
    } else {
      console.log("No saved event found in localStorage");
    }
  }, []);

  // Check if savedEvent is properly set
  if (!savedEvent) {
    console.log("savedEvent is null or undefined.");
    return <div>No events found. Please create and save an event first.</div>;
  }

  // Log to check if savedEvent is being set properly
  console.log("Rendering with saved event:", savedEvent); 

  // Transform the savedEvent into the format required by react-big-calendar
  const calendarEvent = {
    title: savedEvent.title || "Untitled Event",
    start: new Date(savedEvent.when), 
    end: new Date(new Date(savedEvent.when).getTime() + 60 * 60 * 1000), // adjust as needed
    description: `${savedEvent.description || ""} - Bring: ${savedEvent.bring || "Nothing specified"}`,
    location: savedEvent.where || "No location specified",
  };

  const googleUrl = google({
    title: savedEvent.title,
    description: savedEvent.description,
    start: savedEvent.when,
    location: savedEvent.where,
  });

  // Render the calendar with react-big-calendar
  return (
    <div>
      
      {/* Display the react-big-calendar with the saved event */}
      <div className="calendar-container" style={{ height: "80vh" }}>
      <h1>My Calendar</h1>
        <Calendar
          localizer={localizer}
          events={[calendarEvent]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          views={["month", "week", "day"]} 
        />
      </div>
      <button type="addtocal" className="button addtocal button"
        onClick={() => window.open(googleUrl, "_blank")}>
        Add to Google Calendar
      </button>
    </div>
  );
}

export default CalendarComponent;
