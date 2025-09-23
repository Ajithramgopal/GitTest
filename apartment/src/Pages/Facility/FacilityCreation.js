import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function FacilityCreation() {
  const { state: facility, setState: setFacility } = useFormState("facility"); // 👈 renamed for clarity

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state || null;
  const { postData, putData } = useApi("facilitymas");

  const { data: statusData } = useApi("status");

  // console.log("data", statusData);

  // ✅ Pre-fill if editing
  useEffect(() => {
    if (editData) {
      setFacility({
        ...editData,
      });
    }
  }, [editData, setFacility]);

  // ✅ Handle change
  const handleChange = (key, value) => {
    setFacility((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log("fac", facility);
  // ✅ Validate
  const validate = () => {
    const err = Validation("facility", facility);
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
      if (editData) {
        await putData(editData.facilitymasId, facility);
        notifySuccess("Facility updated successfully!");
      } else {
        await postData(facility);
        notifySuccess("Facility created successfully!");
      }

      setTimeout(() => {
        navigate("/facilityrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving facility:", error);
      toast.error("❌ Failed to save facility. Try again!");
    }
  };

  return (
    <>
      <h1>{editData ? "Edit Facility" : "Create Facility"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Facility Name */}
          <div className="form-group">
            <label>Facility Name</label>
            <input
              type="text"
              value={facility.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          {/* Available Slots */}
          <div className="form-group">
            <label>Available Slots</label>
            <input
              type="number"
              value={facility.availableslot || ""}
              onChange={(e) =>
                handleChange("availableslot", Number(e.target.value))
              }
            />
          </div>

          {/* Price per Slot */}
          <div className="form-group">
            <label>Price per Slot</label>
            <input
              type="number"
              value={facility.priceslot || ""}
              onChange={(e) =>
                handleChange("priceslot", Number(e.target.value))
              }
            />
          </div>

          {/* Is Paid */}
          <div className="form-group">
            <label>Is Paid</label>
            <select
              value={facility.isPaid || ""}
              onChange={(e) => handleChange("isPaid", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              value={facility.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select</option>
              {statusData.map((item, index) => (
                <option key={index} value={item.statusId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Attachment */}
          <div className="form-group">
            <label>Attachment</label>
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => handleChange("attach", e.target.files[0])}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={facility.desc || ""}
              onChange={(e) => handleChange("desc", e.target.value)}
              rows={5}
              cols={40}
            />
          </div>
          <button type="submit">{editData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
