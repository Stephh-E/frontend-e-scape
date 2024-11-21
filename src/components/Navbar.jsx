import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchDoubleClick = () => {
    navigate("/searchevents");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Sign In Page</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/events">New Event Page</Link>
        </li>
        <li>
          <Link to="/create">Create Event Page</Link>
        </li>
        <li>
          {/* Search Bar */}
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            onDoubleClick={handleSearchDoubleClick}
            placeholder="Search Events..."
            className="search-bar"
          />
        </li>
        <li>
          <Link to="/profile">
            <i className="fa-solid fa-circle-user fa-2xl"></i> User 1
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
