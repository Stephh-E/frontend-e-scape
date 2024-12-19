import { useEffect, useState } from "react";
import { google } from "calendar-link";
import { useUserAuthContext } from "../contexts/UserAuthContextProvider";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import "../css/MyCalendar.css";
import "../css/global.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userJwt] = useUserAuthContext();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/event/attending`, 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userJwt.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.data){
        const formattedEvents = data.data.map((event) => ({
          id: event._id,
          title: event.eventName,
          start: new Date(event.eventDate),
          end: new Date(new Date(event.eventDate).getTime() + 60 * 60 * 1000),
          description: event.description || "No description",
          location: event.location || "No location"
        }));
        setEvents(formattedEvents);
      } else {
        setErrorMessage(data.message || "Failed to fetch events.");
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
      setErrorMessage("An error occurred while loading events, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const googleUrl = selectedEvent
    ? google({
        title: selectedEvent.title,
        description: selectedEvent.description,
        start: selectedEvent.start,
        location: selectedEvent.location,
      })
    : "";

    const handleEventSelect = (event) => {
      setSelectedEvent(event);
      document.querySelector(".event-details-modal").classList.add("show");
    };

    const closeModal = () => {
      setSelectedEvent(null);
      document.querySelector(".event-details-modal").classList.remove("show");
    };

    console.log("Google URL:", googleUrl);

  return (
    <div className="container">
      <div className="left-column">
        <h2>MY EVENTS</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
          ) : (
            events.map((event) => (
            <div className="event-card" key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            <p>{event.location}</p>
            <button className="button" onClick={() => handleEventSelect(event)}>
                View Event
              </button>
            </div>
          ))
        )}
      </div>

      <div className="right-column">
        <h2>MY CALENDAR</h2>
        <div className="calendar-container">
          {/* Calendar Component */}
          <Calendar
            localizer={localizer}
            events={events} 
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleEventSelect}
          />
        </div>
      </div>

      {selectedEvent && googleUrl && (
        <div className="event-details-modal">
          <div className="model-content">
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Start Time:</strong> {selectedEvent.start.toString()}</p>
            <p><strong>End Time:</strong> {selectedEvent.end.toString()}</p>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Add to Google Calendar
            </a>
            <button onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
