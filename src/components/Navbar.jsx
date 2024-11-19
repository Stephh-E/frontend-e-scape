import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">EventPlanner</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/create">Create Event</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;