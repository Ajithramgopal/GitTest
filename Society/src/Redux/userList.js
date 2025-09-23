import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./userSlice";

export default function UserList() {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    dob: "",
    mob: "",
  });

  const [err, setErr] = useState({});
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handleChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //   const validateForm = () => {
  //     const newErr = {};
  //     if (!userData.name) newErr.name = "Name is required";
  //     if (!userData.mob) newErr.mob = "Mobile number is required";
  //     return newErr;
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formErrors = validateForm();
    // if (Object.keys(formErrors).length > 0) {
    //   setErr(formErrors);
    //   return;
    // }

    dispatch(addUser(userData)); // ✅ Send data to Redux
    console.log("userData", userData);
    setUserData({ name: "", age: "", dob: "", mob: "" });
    setErr({});
  };

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

      <h2>All Users</h2>
      {/* <ul>
        {users.map((user, i) => (
          <li key={i}>
            {user.name} - {user.age} - {user.dob} - {user.mob}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
