import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function ResidentsCreation() {
  const { state, setState } = useFormState("resident");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("resident");

  const { data: blockData } = useApi("block");
  const { data: flatData } = useApi("flat");
  const { data: roleData } = useApi("role");
  const { data: statusData } = useApi("status");
  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (EditData) {
      setState({
        ...EditData,
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

  // ✅ Validation function
  const validate = () => {
    const err = Validation("residents", state);
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
        await putData(EditData.residentId, state);
        notifySuccess("Resident updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Resident created successfully!");
      }

      // ⏳ Delay navigation so toast is visible
      setTimeout(() => {
        navigate("/residentrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving resident:", error);
      toast.error("❌ Failed to save resident. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Resident" : "Create Resident"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={state.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          {/* Block ID */}
          <div className="form-group">
            <label>Block ID</label>
            <select
              name="blockId"
              value={state.blockId || ""}
              onChange={(e) => handleChange("blockId", e.target.value)}
            >
              {blockData.map((item, index) => (
                <option key={index} value={item.blockId}>
                  {item.blockName}
                </option>
              ))}
            </select>
            {errors.blockId && <p style={{ color: "red" }}>{errors.blockId}</p>}
          </div>
          {/* Flat ID */}
          <div className="form-group">
            <label>Flat ID</label>
            <select
              name="flatId"
              value={state.flatId || ""}
              onChange={(e) => handleChange("flatId", e.target.value)}
            >
              {flatData.map((item, index) => (
                <option key={index} value={item.flatId}>
                  {item.flatName},{item.flatNo}
                </option>
              ))}
            </select>
            {errors.flatId && <p style={{ color: "red" }}>{errors.flatId}</p>}
          </div>
          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>
            <PhoneInput
              defaultCountry="in"
              value={state.mobile}
              onChange={(phone) => handleChange("mobile", phone)}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={state.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          {/* Aadhar */}
          <div className="form-group">
            <label>Aadhar</label>
            <input
              type="text"
              name="aadhar"
              value={state.aadhar || ""}
              onChange={(e) => handleChange("aadhar", e.target.value)}
            />
            {errors.aadhar && <p style={{ color: "red" }}>{errors.aadhar}</p>}
          </div>
          {/* Role */}
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
            {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
          </div>
          {/* Start Date */}
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={state.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            {errors.startDate && (
              <p style={{ color: "red" }}>{errors.startDate}</p>
            )}
          </div>
          {/* End Date */}
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={state.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
            {errors.endDate && <p style={{ color: "red" }}>{errors.endDate}</p>}
          </div>
          {/* Status */}
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
            {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
          </div>
          {/* Attach (file upload) */}
          <div className="form-group">
            <label>Attach</label>
            <input
              type="file"
              name="attach"
              onChange={(e) => handleChange("attach", e.target.files[0])}
            />
            {errors.attach && <p style={{ color: "red" }}>{errors.attach}</p>}
          </div>
          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
