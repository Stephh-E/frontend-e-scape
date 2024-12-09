import React, { useState } from "react";
import "../css/global.css";
import "../css/SignIn.css";

const SignIn = () => {
  const [interests, setInterests] = useState(""); // Add state to track the selected value

  const handleInterestChange = (e) => {
    setInterests(e.target.value);
  };

  return (
    <div className="signin-container">
      <form className="signin-form">
        <h1>Create new Account</h1>
        <p className="login-text">
          Already Registered? <a href="/login">Login here</a>
        </p>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="User" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="example@email.com" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="******" />

        <label htmlFor="interests">My Interests</label>
        <select
          id="interests"
          name="interests"
          value={interests} // Controlled by state
          onChange={handleInterestChange} // Update state on change
        >
          <option value="" disabled>
            I’m interested in...
          </option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="art">Art</option>
          <option value="familyfriendly">Family Friendly</option>
        </select>

        <button type="submit" className="button signup-button">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignIn;
