import React, { useState } from "react";

export default function FormingData() {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    dob: "",
    mob: "",
  });

  const [allUserData, setAllUserData] = useState([]);

  const [err, setErr] = useState({});
  const handleChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!userData.name) {
    err.name = "User ID is required";
  }

  if (!userData.mob) {
    err.mob = "Mobile No Required";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllUserData((prev) => [...prev, userData]);
    setUserData({ name: "", age: "", dob: "", mob: "" }); // optional: reset form
  };
  console.log("allUserData", allUserData);
  console.log("err", err);

  return (
    <div>
      <h1>User Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <p style={{ color: "red" }}>{err.name}</p>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={userData.age}
          onChange={(e) => handleChange("age", e.target.value)}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={userData.dob}
          onChange={(e) => handleChange("dob", e.target.value)}
        />

        <label>Mobile</label>
        <input
          type="text"
          name="mob"
          value={userData.mob}
          onChange={(e) => handleChange("mob", e.target.value)}
        />

        <p style={{ color: "red" }}>{err.mob}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
