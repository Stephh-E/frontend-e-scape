import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

<script src="https://kit.fontawesome.com/238c66733a.js" crossorigin="anonymous"></script>

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Sign in Page</h1>} />
        <Route path="/events" element={<h1>New Event Page</h1>} />
        <Route path="/create" element={<h1>Create Event Page</h1>} />
        <Route path="/myevents" element={<h1>My Events</h1>} />
        <Route path="/searchevents" element={<h1>Search Events</h1>} />
        <Route path="/calendar" element={<h1>My Calendar</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
      </Routes>
    </div>
  );
}

export default App;

