import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchEvents from "./components/SearchEvents";
import CreateEvent from "./components/CreateEvent";
import SignIn from "./components/SignIn";
import SavedEvent from "./components/SavedEvent";
import Calendar from "./components/MyCalendar";


function App() {
  useEffect(() => {
    console.log(import.meta.env);
    console.log(import.meta.env.VITE_AUTH_API_URL);

  },[]);

  const getProtectedRoute = async () => {
    // Makes API request to "/"
    let response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/`)
    let data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <Navbar/>
      <main>
      <button onClick={getProtectedRoute}>
        Visit protected API route
      </button>
        <link id="theme-stylesheet" rel="stylesheet" href="/themes/default.css" />
        <Routes>
          <Route path="/events" element={<h1>New Event Page</h1>} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/myevents" element={<h1>My Events</h1>} />
          <Route path="/searchevents" element={<SearchEvents />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/saved-event" element={<SavedEvent />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;

