import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateUser() {
  const [userData, setuserData] = useState({
    userId: "",
    userName: "",
    status: "Inactive", // default
    role: "",
    email: "",
    mobile: "",
    block: "",
    flat: "",
    password: "",
    conPassword: "",
    createdBy: "",
    createdDate: "",
    updatedBy: "",
    updatedDate: "",
    organizationId: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const EditData = location.state;

  console.log("data", EditData);
  // useEffect(() => {
  //   if (EditData) {
  //     setuserData({
  //       userId: EditData.userId || "",
  //       userName: EditData.userName || "",
  //       status: EditData.status || "",
  //       role: EditData.role || "",
  //       email: EditData.email || "",
  //       mobile: EditData.mobile || "",
  //       block: EditData.block || "",
  //       flat: EditData.flat || "",
  //       password: EditData.password || "",
  //       conPassword: EditData.conPassword || "",
  //       createdBy: EditData.createdBy || "",
  //       createdDate: EditData.createdDate || "",
  //       updatedBy: EditData.updatedBy || "",
  //       updatedDate: EditData.updatedDate || "",
  //       organizationId: EditData.organizationId || "",
  //     });
  //   }
  // }, [EditData]);

  // useEffect(() => {
  //   if (EditData) {
  //     setuserData((prev) => ({
  //       ...prev,
  //       ...EditData, // merge edit values into state
  //     }));
  //   }
  // }, [EditData]);

  const handleChange = (key, value) => {
    setuserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!userData.userName.trim()) {
      newErrors.username = "Username is required";
    }
    if (!userData.mobile.trim()) {
      newErrors.mobile = "Mobile No is required";
    } else if (!/^\d{10}$/.test(userData.mobile)) {
      newErrors.mobile = "Mobile No must be 10 digits";
    }
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop submit if errors exist

    axios
      .post("http://localhost:5000/api/users", userData)
      .then((response) => {
        console.log("✅ User Created:", response.data);
        navigate("/users"); // redirect after save
      })
      .catch((err) => console.log(err));

    setuserData({
      userId: "",
      userName: "",
      status: "Inactive",
      role: "",
      email: "",
      mobile: "",
      block: "",
      flat: "",
      password: "",
      conPassword: "",
      createdBy: "",
      createdDate: "",
      updatedBy: "",
      updatedDate: "",
      organizationId: "",
    });
    setErrors({});
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
        <p style={{ color: "red" }}>{errors.username}</p>

        <label>Status</label>
        <input
          type="checkbox"
          name="status"
          checked={userData.status === "Active"}
          onChange={(e) =>
            handleChange("status", e.target.checked ? "Active" : "Inactive")
          }
        />
        {userData.status}

        <label>Role</label>
        <select
          name="role"
          value={userData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
          <option value="Owner">Owner</option>
        </select>

        <label>Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={userData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          maxLength={10}
          placeholder="Enter 10-digit number"
        />
        <p style={{ color: "red" }}>{errors.mobile}</p>

        <label>Mail</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <p style={{ color: "red" }}>{errors.email}</p>

        <label>Block</label>
        <select
          name="block"
          value={userData.block}
          onChange={(e) => handleChange("block", e.target.value)}
        >
          <option value="">Select Block</option>
          <option value="A">Block A</option>
          <option value="B">Block B</option>
          <option value="C">Block C</option>
        </select>

        <label>Flat</label>
        <select
          name="flat"
          value={userData.flat}
          onChange={(e) => handleChange("flat", e.target.value)}
        >
          <option value="">Select Flat</option>
          <option value="101">101</option>
          <option value="102">102</option>
          <option value="103">103</option>
        </select>

        <button type="submit">Submit</button>
        <button onClick={navigate("/rep")}>Back</button>
      </form>
    </>
  );
}
