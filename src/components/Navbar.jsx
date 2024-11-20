import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

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
          <Link to="/profile">
            <i className="fa-light fa-circle-user"></i> Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;