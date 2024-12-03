import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/global.css"; 
import "../css/Navbar.css";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchDoubleClick = () => {
    navigate("/searchevents");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
  {/* Left section: Hamburger menu and calendar */}
  <div className="left-section">
    <div className="hamburger-menu" onClick={toggleMenu}>
      <i className="fa-solid fa-bars fa-1xl"></i>
    </div>

    <Link to="/calendar" className="calendar-link">
      <i className="fa-solid fa-calendar-days fa-1xl"></i>
    </Link>
  </div>

  {/* Right section: Search bar and profile signin */}
  <div className="right-section">
    <input
      type="text"
      value={searchInput}
      onChange={handleSearchChange}
      onDoubleClick={handleSearchDoubleClick}
      placeholder="Search Events..."
      className="search-bar"
    />
    <Link to="/signin" className="profile-link">
      <i className="fa-solid fa-circle-user fa-1xl"></i>
    </Link>
  </div>

  {/* Dropdown Menu (triggered by hamburger) */}
  {menuOpen && (
    <ul className="dropdown-menu">
      <li>
        <Link to="/create" onClick={() => setMenuOpen(false)}>
          Create Event
        </Link>
      </li>
      <li>
        <Link to="/searchevents" onClick={() => setMenuOpen(false)}>
          Search Events
        </Link>
      </li>
    </ul>
  )}
</nav>
  );
}

export default Navbar;
