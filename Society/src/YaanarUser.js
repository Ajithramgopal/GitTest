import React, { useState } from "react";
import axios from "axios";

export default function YaanarUser() {
  const [userData, setuserData] = useState({
    userid: "",
    username: "",
    password: "",
    conpassword: "",
    email: "",
    mobile: "",
    role: "",
    block: "",
    flat: "",
    createdby: "",
    createddate: "",
    updatedby: "",
    updateddate: "",
    organizationid: "",
  });

  const [det, setDet] = useState([]);
  const [err, setErr] = useState("");

  const handleChange = (key, value) => {
    setuserData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErr(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation here
    if (!userData.username) {
      setErr("Username must have some value");
      return; // stop submit
    }
    if (!userData.password) {
      setErr("password must have some value");
      return; // stop submit
    }
    // Update local state list
    setDet((prev) => [...prev, userData]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        userData
      );
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error posting data:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        {/* ✅ Show error message */}
        {err && <p style={{ color: "red" }}>{err}</p>}
        <label>password</label>
        <input
          type="text"
          name="password"
          value={userData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {/* ✅ Show error message */}
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit">{userData ? "submit" : "Apply"}</button>
      </form>
    </div>
  );
}
