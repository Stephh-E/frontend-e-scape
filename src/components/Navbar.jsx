import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/Navbar.css";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState(null); // State for username
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Load the username from localStorage
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchDoubleClick = () => {
    navigate("/searchevents");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear user data from localStorage
    setUsername(null); // Reset the username state
    navigate("/login"); // Redirect to login page
  };

  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent default browser context menu
    setDropdownVisible(true); // Show custom dropdown menu
  };

  const closeDropdown = () => {
    setDropdownVisible(false); // Hide dropdown menu
  };

  useEffect(() => {
    // Close the dropdown when clicking outside
    const handleClickOutside = () => closeDropdown();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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

      {/* Right section: Search bar and profile/signup */}
      <div className="right-section">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          onDoubleClick={handleSearchDoubleClick}
          placeholder="Search Events..."
          className="search-bar"
        />
        {username ? (
          <div className="profile-container">
            <div className="profile-link">
              <i className="fa-solid fa-circle-user fa-1xl"></i>
              <span>{username}</span> {/* Display the username */}
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/signup" className="profile-link">
            <i className="fa-solid fa-circle-user fa-1xl"></i>
          </Link>
        )}
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
