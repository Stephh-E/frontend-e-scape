import React, { useState } from "react";
import "../css/global.css";
import "../css/Login.css";

const Login = () => {

  return (
    
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Username" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="example@email.com" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="******" />
        <button type="submit" className="button login-button">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;