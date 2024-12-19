import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/global.css";
import "../css/Login.css";
import { UserAuthContext } from "../contexts/UserAuthContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userJwt, setUserJwt] = useContext(UserAuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage(""); // Reset error message
    setLoading(true); // Show loading spinner or text

    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/account/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,  
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, store the JWT and email
        const { jwt } = data.data;
        setUserJwt({ token: jwt, email })
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("email", email);

        // Redirect to the New Event page after login
        navigate("/new-event");
        setErrorMessage(""); // Reset error message
      } else {
        setErrorMessage(data.message || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("An error occurred during login: ", error);
      setErrorMessage("An error occurred while trying to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Display error message if it exists */}
        {errorMessage && (
          <div className="error-messages">
            <div className="error-message">{errorMessage}</div>
          </div>
        )}

        <button type="submit" className="button login-button" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
