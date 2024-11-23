import React, { useState } from 'react';
import './SearchEvents.css';  

const SearchEvents = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('');
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleFilterChange = (e) => {
      setFilter(e.target.value);
    };

    return (
      <div className="search-events-container">
        {/* New Left Column */}
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
                <i className="fas fa-filter filter-icon"></i>
                <select
                  className="filter-dropdown"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter</option>
                  <option value="date">Date</option>
                  <option value="category">Category</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </div>
        </div>
  
        {/* Event Grid */}
        <div className="events-grid">
          <div className="event-column">
            <div className="event-card">
              <h3>Event 1</h3>
            </div>
            <div className="event-card">
              <h3>Event 2</h3>
            </div>
          </div>
          <div className="event-column">
            <div className="event-card">
              <h3>Event 3</h3>
            </div>
            <div className="event-card">
              <h3>Event 4</h3>
            </div>
          </div>
          <div className="event-column">
            <div className="event-card">
              <h3>Event 5</h3>
            </div>
            <div className="event-card">
              <h3>Event 6</h3>
            </div>
          </div>
        </div>
  
        <div className="load-more">
          <button className="load-more-button">Load More</button>
        </div>
      </div>
    );
  };
  
  export default SearchEvents;
