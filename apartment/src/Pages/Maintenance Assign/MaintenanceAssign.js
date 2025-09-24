import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
import useFormState from "../../Component/useFormState";
import FetchResident from "../../Component/FetchResident";
import FetchBlock from "../../Component/FetchBlock";
import FetchFlat from "../../Component/FetchFlat";
import FetchName from "../../Component/FetchName";
export default function MaintenanceAssign() {
  const { state: maintenance, setState: setMaintenance } =
    useFormState("maintenance");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state || null;
  const { postData, putData } = useApi("maintenance");
  // const { data: residents = [] } = useApi("users");
  const { data: blocks = [] } = useApi("block");
  const { data: flats = [] } = useApi("flat");

  // ✅ Pre-fill if editing
  useEffect(() => {
    if (editData) {
      setMaintenance({
        ...editData,
      });
    }
  }, [editData]);

  // ✅ Handle change
  const handleChange = (key, value) => {
    setMaintenance((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log("maintenance", maintenance);

  // const hanle
  // ✅ Validation
  const validate = () => {
    const err = Validation("maintenance", maintenance);
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
        await putData(editData.maintainId, maintenance);
        notifySuccess("Maintenance request updated successfully!");
      } else {
        await postData(maintenance);
        notifySuccess("Maintenance request created successfully!");
      }

      setTimeout(() => {
        navigate("/maintenanceassignrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving maintenance:", error);
      toast.error("❌ Failed to save maintenance. Try again!");
    }
  };

  return (
    <>
      <h1>{editData ? "Edit Maintenance" : "Create Maintenance"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Resident */}
          <div className="form-group">
            <label>Resident</label>
            {editData ? (
              // <FetchResident residentId={maintenance.residentId} />

              <FetchName type="resident" id={maintenance.residentId} />
            ) : null}
          </div>

          {/* Block */}
          <div className="form-group">
            <label>Block</label>
            {editData ? (
              // <FetchBlock blockId={Number(maintenance.block)} />
              <FetchName type="block" id={Number(maintenance.block)} />
            ) : null}
          </div>

          {/* Flat */}
          <div className="form-group">
            <label>Flat</label>
            {editData ? (
              // <FetchFlat flatId={Number(maintenance.flat)} />

              <FetchName type="flat" id={Number(maintenance.flat)} />
            ) : null}
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            {/* <input
              type="text"
              value={maintenance.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
            /> */}
            {editData ? (
              // <FetchFlat flatId={Number(maintenance.flat)} />
                
              <FetchName type="category" id={Number(maintenance.category)} />
            ) : null}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={maintenance.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Attachment */}
          <div className="form-group">
            <label>Attachment</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("attach", e.target.files[0])}
            />
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              value={maintenance.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="form-group">
            <label>Priority</label>
            <select
              value={maintenance.priority || ""}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Assigned To */}
          <div className="form-group">
            <label>Assigned To</label>
            <input
              type="text"
              value={maintenance.assignedTo || ""}
              onChange={(e) => handleChange("assignedTo", e.target.value)}
            />
          </div>

          {/* Assigned At */}
          <div className="form-group">
            <label>Assigned At</label>
            <input
              type="datetime-local"
              value={maintenance.assignedAt || ""}
              onChange={(e) => handleChange("assignedAt", e.target.value)}
            />
          </div>

          {/* Resolved At */}
          <div className="form-group">
            <label>Resolved At</label>
            <input
              type="datetime-local"
              value={maintenance.reslovedAt || ""}
              onChange={(e) => handleChange("reslovedAt", e.target.value)}
            />
          </div>

          {/* Rating */}
          <div className="form-group">
            <label>Rating</label>
            <select
              value={maintenance.rating || ""}
              onChange={(e) => handleChange("rating", e.target.value)}
            >
              <option value="">Select Rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>

          {/* Feedback */}
          <div className="form-group">
            <label>Feedback</label>
            <textarea
              value={maintenance.feedBack || ""}
              onChange={(e) => handleChange("feedBack", e.target.value)}
            />
          </div>

          <button type="submit">{editData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
