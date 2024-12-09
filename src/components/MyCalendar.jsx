import "../css/global.css";
import "../css/MyCalendar.css";
import "add-to-calendar-button";
import React from "react";
import { google } from "calendar-link";
import { ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';

function Calendar() {
  const event = {
    title: "My Event",
    description: "This is a test event.",
    start: "2024-12-10T08:00:00", 
  };

  const googleUrl = google(event); // Generate the Google Calendar link

  return (
    <div>
      <ScheduleXCalendar events={[event]} />
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
