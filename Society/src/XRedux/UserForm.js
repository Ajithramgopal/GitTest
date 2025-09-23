import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./userSlice";
import { fetchUsers } from "./userSlice";
import { addFilling, fillingSlice } from "./fillingSlice";
export default function UserForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()); // call API when component loads
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email) {
      dispatch(addUser(form));
      dispatch(addFilling(form));
      setForm({ name: "", email: "" });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Redux User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <h3>Users List</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} ({user.email})
            <button onClick={() => dispatch(removeUser(index))}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
