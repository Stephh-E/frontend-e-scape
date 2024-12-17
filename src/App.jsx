import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchEvents from "./components/SearchEvents";
import CreateEvent from "./components/CreateEvent";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import SavedEvent from "./components/SavedEvent";
import Calendar from "./components/MyCalendar";
import NewEvent from "./components/NewEvent";
import { useUserAuthContext } from "./contexts/UserAuthContextProvider";


function App() {

  const [userJwt, setUserJwt] = useUserAuthContext();
  console.log("userJwt and setUserJwt:", userJwt, setUserJwt);

  useEffect(() => {
    console.log(import.meta.env.VITE_AUTH_API_URL);
  },[]);

  const getHomepage = async () => {
    // Makes API request to "/"
    let response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/`)
    let data = await response.json();
    console.log(data); 
  };

  const postUserSignUp = async () => {
    let userDetails = {
      username: "steph" + Math.floor(Math.random() * 1000),
      password: "SomeCoolPassword"
    };

    let response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/signup`,
      {
        method: "POST",
        body: userDetails
      }
    );
    let data = await response.json();
    console.log(data);
    setUserJwt(data.jwt);
  }
  
  return (
    <div>
      <Navbar/>
      <main>
        <button onClick={postUserSignUp}>
          Sign up a user
        </button>
        <link id="theme-stylesheet" rel="stylesheet" href="/themes/default.css" />
        <Routes>
          <Route path="/events" element={<h1>New Event Page</h1>} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/myevents" element={<h1>My Events</h1>} />
          <Route path="/searchevents" element={<SearchEvents />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/saved-event" element={<SavedEvent />} />
          <Route path="/new-event" element ={<NewEvent />} ></Route>
      </Routes>
      </main>
    </div>
  );
}

export default App;

