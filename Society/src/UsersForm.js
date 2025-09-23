import React, { useState } from "react";
import axios from "axios";

function UsersForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    conpassword: "",
    email: "",
    mobile: "",
    role: "",
    block: "",
    flat: "",
    createdby: "admin",
    organizationid: "ORG001",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users", form);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error inserting user");
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="conpassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        onChange={handleChange}
      />
      <input
        type="text"
        name="block"
        placeholder="Block"
        onChange={handleChange}
      />
      <input
        type="text"
        name="flat"
        placeholder="Flat"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default UsersForm;
