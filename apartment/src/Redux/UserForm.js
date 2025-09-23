import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./anithaSlice";
import React, { useState } from "react";
export default function UserForm() {
  const [userData, setUserData] = useState({ userName: "", age: "", mob: "" });
  const dispatch = useDispatch();

  // ✅ properly get data from Redux store
  const data = useSelector((state) => state.addUserData.formData);

  const handleChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(userData));
    setUserData({ userName: "", age: "", mob: "" }); // clear input
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={(e) => handleChange("userName", e.target.value)}
        />
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={userData.age}
          onChange={(e) => handleChange("age", e.target.value)}
        />
        <label>Mobile</label>
        <input
          type="text"
          name="mob"
          value={userData.mob}
          onChange={(e) => handleChange("mob", e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Users List</h3>
      <ul>
        {data.map((user, index) => (
          <li key={index}>
            {user.userName} - {user.age} - {user.mob}-
            {/* <button onClick={dispatch(removeUser(user.userName))}>-</button> */}
          </li>
        ))}
      </ul>
    </>
  );
}
