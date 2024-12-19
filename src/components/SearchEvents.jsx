import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../css/global.css"; 
import '../css/SearchEvents.css';  

const SearchEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [events, setEvents] = useState([]); // State to store fetched events
  const [error, setError] = useState(null); // State to handle errors
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");

  const navigate = useNavigate();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter a search query."); // Error for empty search query
      return;
    }

    try {
      setError(null); // Reset error state before new request

      // Inregrate the filter if applicable
      const filterQuery = filter ? `&category=${encodeURIComponent(filter)}` : '';
      const url = `${import.meta.env.VITE_AUTH_API_URL}/search/public?query=${encodeURIComponent(searchQuery)}${filterQuery}`;

      // Make GET request to backend using fetch
      const response = await fetch(url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(jwt && { Authorization: `Bearer ${jwt}` })
          },
        }
      );

      // Check for response status
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch events.");
      }

      // Parse and update events state
      const data = await response.json();
      
      if (data.data.jwt) {
        const token = data.data.jwt;
        setJwt(token);
        localStorage.setItem("jwt", token);
      }

      setEvents(data.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
    }
  };

  const handleEventClick = (event) => {
    // Save the selected event to local storage
    localStorage.setItem("savedEvent", JSON.stringify(event));
    // Navigate to the SavedEvent page
    navigate("/saved-event");
  };

  return (
    <div className="search-events-container">
      {/* Left Column */}
      <div className="search-column">
        <div className="search-section">
          <h1 className="search-title">Search Events</h1>
          <p className="search-subtitle">Search events in your area</p>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for events..."
            />
            <div className="filter-dropdown-container">
              <button className="filter-icon">
                <i className="fa-solid fa-sliders fa-xl filter-icon"></i>
              </button>
              <select
                className="filter-dropdown"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="" disabled>Select Filter</option>
                <option value="date">Date</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="art">Art</option>
                <option value="familyfriendly">Family Friendly</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>
          <button className="button search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>

      {/* Event Grid */}
      <div className="events-grid">
        {error ? ( 
          // Backend error message (e.g., validation or 404)
          <div className="error-message">{error}</div>
        ) : events.length > 0 ? (
          // Events found - display the list
          events.map((event, index) => (
            <div className="event-column" 
                 key={index}>
                 onCLick={() => handleEventClick(event)}
              <div className="event-card">
                <h3>{event.eventName}</h3>
                <div>{event.description}</div>
                <p>
                  <strong>Where:</strong> {event.location}
                </p>
                <p>
                  <strong>When:</strong> {event.eventDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          // No events returned - show empty state
          <p className="no-results-message">No events found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchEvents;