import React, { useEffect, useState } from "react";
import axios from "axios";
export default function UserCreation() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [detuser, setDetUser] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://wikyldravycqbmygzndm.supabase.co/rest/v1/user", {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpa3lsZHJhdnljcWJteWd6bmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzk4NDEsImV4cCI6MjA2NDg1NTg0MX0.aa3eUkk6aVtXODbimfbOww_W8AIaijrELjpxXdtbrko",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpa3lsZHJhdnljcWJteWd6bmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzk4NDEsImV4cCI6MjA2NDg1NTg0MX0.aa3eUkk6aVtXODbimfbOww_W8AIaijrELjpxXdtbrko",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleChange = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add current user to the list
    setDetUser((prev) => [...prev, user]);

    // Check if user exists in Supabase data
    const found = data.find((org) => org.orgname === user.username);
    if (!found) {
      alert("Mismatch: Username not found in organization data");
    } else {
      alert("User matched successfully");
    }
  };

  return (
    <div>
      <img src="/Apart.jpg" alt="Apartment" width="300" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <h3>Fetched Org Names:</h3>
      <ul>
        {data.map((org, index) => (
          <li key={index}>{org.username}</li>
        ))}
      </ul>

      <h3>Submitted Usernames:</h3>
      <ul>
        {detuser.map((org, index) => (
          <li key={index}>{org.username}</li>
        ))}
      </ul>
    </div>
  );
}
