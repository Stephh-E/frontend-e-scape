import React, { useEffect, useState } from "react";
import { google } from "calendar-link";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import "../css/MyCalendar.css";
import "../css/global.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [savedEvent, setSavedEvent] = useState(null);

  useEffect(() => {
    const event = localStorage.getItem("savedEvent");
    if (event) {
      const parsedEvent = JSON.parse(event);
      setSavedEvent({
        title: parsedEvent.title,
        start: new Date(parsedEvent.when),
        end: new Date(new Date(parsedEvent.when).getTime() + 60 * 60 * 1000),
        description: parsedEvent.description || "No description",
        location: parsedEvent.where || "No location",
      });
    }
  }, []);

  const googleUrl = savedEvent
    ? google({
        title: savedEvent.title,
        description: savedEvent.description,
        start: savedEvent.start,
        location: savedEvent.location,
      })
    : "";

  return (
    <div className="container">
      <div className="left-column">
        <h2>MY EVENTS</h2>
        <div className="event-card">
          <h3>Event A</h3>
          <button className="button">VIEW</button>
        </div>
        <div className="event-card">
          <h3>Event B</h3>
          <button className="button">VIEW</button>
        </div>
      </div>

      <div className="right-column">
        <h2>MY CALENDAR</h2>
        <div className="calendar-container">
          {/* Calendar Component */}
          <Calendar
            localizer={localizer}
            events={[savedEvent].filter(Boolean)} // Pass the event to the calendar
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
        <button
          className="button"
          onClick={() => window.open(googleUrl, "_blank")}
        >
          Add to Google Calendar
        </button>
      </div>
    </div>
  );
}

export default CalendarPage;
