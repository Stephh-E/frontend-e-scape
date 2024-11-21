import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Define links as an array of objects for scalability and maintainability
  const navLinks = [
    { path: "/", label: "Sign In Page" },
    { path: "/events", label: "New Event Page" },
    { path: "/create", label: "Create Event Page" },
    { path: "/myevents", label: "My Events" },
    { path: "/searchevents", label: "Search Events" },
    { path: "/calendar", label: "My Calendar" },
    { path: "/profile", label: <i className="fa-solid fa-circle-user fa-2xl"></i> },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        {/* Logo with link to home/sign-in */}
        <Link to="/">EventPlanner</Link>
      </div>
      <ul className="nav-links">
        {/* Map through navLinks to create dynamic links */}
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;