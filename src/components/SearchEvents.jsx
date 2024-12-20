import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useUserAuthContext } from "../contexts/UserAuthContextProvider";
import "../css/global.css"; 
import '../css/SearchEvents.css';  

const SearchEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [events, setEvents] = useState([]); // State to store fetched events
  const [error, setError] = useState(null); // State to handle errors
  const [userJwt] = useUserAuthContext();
  const navigate = useNavigate();

  // Function to format the event time
  const formatEventTime = (dateString) => {
    const date = new Date(dateString);

    // Use toLocaleTimeString to format the time (e.g., '7:00 PM' or '10:00 AM')
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = date.toLocaleTimeString([], options);

    return time;
  };

   // useEffect to populate event cards when component mounts
   useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setError(null);

        const url = `${import.meta.env.VITE_AUTH_API_URL}/search/public/all`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch events.");
        }

        const data = await response.json();
        setEvents(data.data);

      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "An unexpected error occurred.");
      }
    };

    fetchAllEvents(); // Call fetch function when component is mounted
  }, []);

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Fetch and display search results
  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter a search query."); // Error for empty search query
      return;
    }

    
    try {
      setError(null); // Reset error state before a new request

      // Inregrate the filter if applicable
      const filterQuery = filter ? `&category=${encodeURIComponent(filter)}` : '';
      const url = `${import.meta.env.VITE_AUTH_API_URL}/search/public?query=${encodeURIComponent(searchQuery)}${filterQuery}`;

      // Make GET request to backend using fetch
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userJwt.token}`, 
        },
      });

      // Check for response status
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch events.");
      }

      // Parse and update events state
      const data = await response.json();
      setEvents(data.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
    }
  };

  // Navigate to the saved event page
  const handleEventClick = (event) => {
    // Save the selected event to local storage
    localStorage.setItem("savedEvent", JSON.stringify(event));
    navigate("/saved-event");
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return description;
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
          <div className="error-message">{error}</div>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <div 
              className="event-column" 
              key={index}
              onClick={() => handleEventClick(event)}
            >
              <div className="event-card">
                <h3>{event.eventName}</h3>
                <p>{truncateDescription(event.description)}</p>
                <span>
                  <strong>Where:</strong> {event.location}
                </span>
                <span>
                  <strong>When:</strong> {new Date(event.eventDate).toLocaleDateString()} at {formatEventTime(event.eventDate)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results-message">No events found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchEvents;
