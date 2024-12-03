import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchEvents from "./components/SearchEvents";
import CreateEvent from "./components/CreateEvent";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div>
      <Navbar/>
      <main>
        <Routes>
          <Route exact path="/" element={<h1>Sign in Page</h1>} />
          <Route exact path="/events" element={<h1>New Event Page</h1>} />
          <Route exact path="/create" element={<CreateEvent />} />
          <Route exact path="/myevents" element={<h1>My Events</h1>} />
          <Route exact path="/searchevents" element={<SearchEvents />} />
          <Route exact path="/calendar" element={<h1>My Calendar</h1>} />
          <Route exact path="/signin" element={<SignIn />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;

