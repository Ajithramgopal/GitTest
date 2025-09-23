import { useState } from "react";
import { addUsers } from "./userSlice";
import { useDispatch } from "react-redux";

export default function FormData() {
  const [form, setForm] = useState({ userName: "", password: "" });
  const dispatch = useDispatch(); // ✅ call hook here

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUsers(form)); // ✅ use dispatch here
    setForm({ userName: "", password: "" }); // optional reset
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          value={form.userName}
          name="userName"
          onChange={(e) => handleChange("userName", e.target.value)} // ✅ fixed
        />
        <label>Password</label>
        <input
          type="text"
          value={form.password}
          name="password"
          onChange={(e) => handleChange("password", e.target.value)} // ✅ fixed
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
