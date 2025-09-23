import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import { UserContext } from "../../Context/UserContext";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
export default function UserCreations() {
  const { state, setState } = useFormState("user");
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { user } = useContext(UserContext);
  const { putData, postData, data: userData = [] } = useApi("users");
  const { data: block = [] } = useApi("block");
  const { data: flat = [] } = useApi(`flat/${state.block}`);
  const { data: roleData = [] } = useApi("role");
  const { data: statusData = [] } = useApi("status");

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (EditData) {
      setState({
        ...EditData,
        createdDate: EditData.createdDate || null,
        updatedDate: EditData.updatedDate || null,
      });
    }
  }, [EditData]);

  // ✅ OnChange function
  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log("userData.length", userData);
  // ✅ Validation function
  const validate = () => {
    const err = Validation("users", state, userData);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };

  // ✅ Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (EditData) {
        await putData(EditData.userId, state);
        notifySuccess("User updated successfully!");
      } else {
        await postData(state);
        notifySuccess("User created successfully!");
      }

      // ⏳ Delay navigation so toast is visible
      setTimeout(() => {
        navigate("/userrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("❌ Failed to save user. Try again!");
    }
  };

  // ✅ Block Value Handle
  const handleBlock = (value) => {
    handleChange("block", value);
  };

  return (
    <>
      <h1>{EditData ? "Edit User" : "Create User"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>UserName</label>
            <input
              type="text"
              name="userName"
              value={state.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
            />
            {errors.userName && (
              <p style={{ color: "red" }}>{errors.userName}</p>
            )}
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={state.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select Status</option>
              {statusData.map((item, index) => (
                <option key={index} value={item.statusId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("upload", e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={state.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              {roleData.map((item, index) => (
                <option key={index} value={item.roleId}>
                  {item.role}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <PhoneInput
              defaultCountry="in"
              value={state.mobile}
              onChange={(phone) => handleChange("mobile", phone)}
            />
            {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
          </div>

          <div className="form-group">
            <label>Block</label>
            <select
              name="block"
              value={state.block}
              onChange={(e) => handleBlock(e.target.value)}
            >
              <option value="">Select Block</option>
              {block.map((item) => (
                <option key={item.blockId} value={item.blockName}>
                  {item.blockName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Flat</label>
            <select
              name="flat"
              value={state.flat}
              onChange={(e) => handleChange("flat", e.target.value)}
            >
              <option value="">Select Flat</option>
              {flat.map((item) => (
                <option key={item.flatId} value={item.flatName}>
                  {item.flatName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label>ConPassword</label>
            <input
              type="password"
              name="conPassword"
              value={state.conPassword}
              onChange={(e) => handleChange("conPassword", e.target.value)}
            />
            {errors.conPassword && (
              <p style={{ color: "red" }}>{errors.conPassword}</p>
            )}
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
