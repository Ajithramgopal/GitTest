import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";
import useFormState from "../../Component/useFormState";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function OrganizationCreation() {
  const { state: org, setState: setOrg } = useFormState("org");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state || null;
  const { postData, putData } = useApi("org");
  const { data: statusData } = useApi("status");
  // ✅ Pre-fill when editing
  useEffect(() => {
    if (editData) {
      setOrg({
        ...editData,
      });
    }
  }, [editData]);

  // ✅ Handle Change
  const handleChange = (key, value) => {
    setOrg((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log("org", org);
  // ✅ Validation
  const validate = () => {
    const err = Validation("organization", org);
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
        await putData(editData.orgId, org);
        notifySuccess("Organization updated successfully!");
      } else {
        await postData(org);
        notifySuccess("Organization created successfully!");
      }

      setTimeout(() => {
        navigate("/orgrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving organization:", error);
      toast.error("❌ Failed to save organization. Try again!");
    }
  };

  return (
    <>
      <h1>{editData ? "Edit Organization" : "Create Organization"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Organization Name */}
          <div className="form-group">
            <label>Organization Name</label>
            <input
              type="text"
              value={org.orgName}
              onChange={(e) => handleChange("orgName", e.target.value)}
            />
            {errors.orgName && <p style={{ color: "red" }}>{errors.orgName}</p>}
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              value={org.status}
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

          {/* Start Date */}
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={org.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={org.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>

          <button type="submit">{editData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
