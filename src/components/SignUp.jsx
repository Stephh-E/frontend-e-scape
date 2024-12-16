import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/SignUp.css";

const SignUp = () => {
  const [interests, setInterests] = useState(""); 
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInterestChange = (e) => {
    setInterests(e.target.value);
  };

  // Handle the form submission
  const handleSignUp = async (e) => {
    e.preventDefault();  // Prevent default form submission

    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/account/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the username in localStorage
        localStorage.setItem("username", username);
        navigate("/calendar");
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h1>Create new Account</h1>
        <p className="login-text">
          Already Registered? <a href="/login">Login here</a>
        </p>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Bind to username state
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Bind to email state
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Bind to password state
        />

        <label htmlFor="interests">My Interests</label>
        <select
          id="interests"
          name="interests"
          value={interests}  // Controlled by state
          onChange={handleInterestChange}  // Update state on change
        >
          <option value="" disabled>
            I’m interested in...
          </option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="art">Art</option>
          <option value="familyfriendly">Family Friendly</option>
        </select>
        {/* Display error message if it exists */}
        {errorMessage && (
          <div className="error-messages">
            <div className="error-message">{errorMessage}</div>
          </div>
        )}
        <button type="submit" className="button signup-button" disabled={loading}>
          {loading ? "Logging in..." : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
