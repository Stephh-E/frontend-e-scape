import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/Navbar.css";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const dropdownRef = useRef(null); // Ref for dropdown menu
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  const handleSearchChange = (event) => setSearchInput(event.target.value);

  const handleSearchDoubleClick = () => navigate("/searchevents");

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

      {/* Right section: Search bar and profile */}
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
            <div className="profile-link" onClick={toggleDropdown}>
              <i className="fa-solid fa-circle-user fa-1xl"></i>
              <span>{username}</span>
            </div>

            {dropdownVisible && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signup" className="profile-link">
            <i className="fa-solid fa-circle-user fa-1xl"></i>
          </Link>
        )}
      </div>

      {/* Hamburger Dropdown */}
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

