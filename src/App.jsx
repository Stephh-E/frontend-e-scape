import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchEvents from "./components/SearchEvents";

function App() {
  return (
    <div>
      <Navbar/>
      <main>
        <Routes>
          <Route exact path="/" element={<h1>Sign in Page</h1>} />
          <Route exact path="/events" element={<h1>New Event Page</h1>} />
          <Route exact path="/create" element={<h1>Create Event Page</h1>} />
          <Route exact path="/myevents" element={<h1>My Events</h1>} />
          <Route exact path="/searchevents" element={<SearchEvents />} />
          <Route exact path="/calendar" element={<h1>My Calendar</h1>} />
          <Route exact path="/profile" element={<h1>Profile Page</h1>} />
      </Routes>
      </main>
    </div>
  );
}

export default App;

