
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import "..//../Css/Login.css"; // Custom CSS file
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState({ error: "", success: "" });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setFeedback({ success: "Login successful ✅", error: "" });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      setFeedback({ error: "Invalid email or password ❌", success: "" });
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {feedback.error && <p className="error">{feedback.error}</p>}
        {feedback.success && <p className="success">{feedback.success}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
