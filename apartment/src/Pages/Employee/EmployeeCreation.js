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
import { Country, State, City } from "country-state-city";

export default function EmployeeCreation() {
  const { state, setState } = useFormState("employee");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("employee");
  const { data: block = [] } = useApi("block");
  const { data: flat = [] } = useApi(`flat/${state.block}`);

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (EditData) {
      setState(EditData);
    }
  }, [EditData]);

  // ✅ OnChange function
  const handleChange = (key, value) => {
    setState((prev) => {
      let updatedState = { ...prev, [key]: value };

      if (key === "dob") {
        const dob = new Date(value);
        const currentDate = new Date();
        const diffMs = currentDate - dob;
        const diffAge = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
        updatedState.age = diffAge;
      }

      return updatedState;
    });
  };

  // ✅ Validation
  const validate = () => {
    const err = Validation("employee", state);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (EditData) {
        await putData(EditData.employeeId, state);
        notifySuccess("Employee updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Employee created successfully!");
      }

      setTimeout(() => {
        navigate("/employeerep");
      }, 1500);
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("❌ Failed to save employee. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Employee" : "Create Employee"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={state.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age</label>
            <input type="number" value={state.age} readOnly />
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label>Mobile</label>
            <PhoneInput
              defaultCountry="in"
              value={state.mobile}
              onChange={(phone) => handleChange("mobile", phone)}
            />
            {errors.mob && <p style={{ color: "red" }}>{errors.mob}</p>}
          </div>

          {/* Adhaar */}
          <div className="form-group">
            <label>Adhaar</label>
            <input
              type="text"
              value={state.adhaar}
              onChange={(e) => handleChange("adhaar", e.target.value)}
            />
          </div>

          {/* Block */}
          <div className="form-group">
            <label>Block</label>
            <select
              value={state.block}
              onChange={(e) => handleChange("block", e.target.value)}
            >
              <option value="">Select Block</option>
              {block.map((item) => (
                <option key={item.blockId} value={item.blockName}>
                  {item.blockName}
                </option>
              ))}
            </select>
          </div>

          {/* Flat */}
          <div className="form-group">
            <label>Flat</label>
            <select
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

          {/* Country */}
          <div className="form-group">
            <label>Country</label>
            <select
              value={state.country}
              onChange={(e) => handleChange("country", e.target.value)}
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div className="form-group">
            <label>State</label>
            <select
              value={state.state}
              onChange={(e) => handleChange("state", e.target.value)}
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry("IN").map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="form-group">
            <label>City</label>
            <select
              value={state.city}
              onChange={(e) => handleChange("city", e.target.value)}
            >
              <option value="">Select City</option>
              {City.getCitiesOfState("IN", state.state).map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <textarea
              value={state.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* Upload */}
          <div className="form-group">
            <label>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("upload", e.target.files[0])}
            />
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
