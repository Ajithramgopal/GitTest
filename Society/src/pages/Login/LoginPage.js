import React, { useEffect, useState } from "react";
import "./Login.css";
import useGetApi from "../CustomHook/useGetApi";
import { useNavigate } from "react-router-dom";
import isLogged from "../CustomHook/isLogged";
export default function LoginPage() {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState([]);
  const { getData, getLoading, getError } = useGetApi("user");
  const navigate = useNavigate();
  console.log("getData", getData);
  const handleChange = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {};
    if (!user.userName) newError.userName = "Please enter username";
    if (!user.password) newError.password = "Please enter password";
    setError(newError);

    if (user.userName === "ajith") {
      isLogged(true);
      navigate("/");
    }

    if (Object.keys(newError).length > 0) return;

    setUserData((prev) => [...prev, user]);
    console.log("Updated userData:", [...userData, user]);
    setUser({ userName: "", password: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <label>UserName</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
            />
            {error.userName && <p className="error">{error.userName}</p>}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {error.password && <p className="error">{error.password}</p>}
          </div>

          <button type="submit">Submit</button>
        </div>
      </form>

      <h3>Fetched Users</h3>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </>
  );
}
