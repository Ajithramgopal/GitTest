import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function AnnounceCreation() {
  const { state, setState } = useFormState("announce");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("announce");
  const { data: block = [] } = useApi("block");
  const { data: flat = [] } = useApi(`flat/${state.targetBlock}`);
  const { data: statusData = [] } = useApi("status");

  // ✅ Pre-fill when editing
  useEffect(() => {
    if (EditData) {
      setState({
        ...EditData,
        updatedby: "system",
        updateddate: new Date().toISOString(),
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
  console.log("state", state);
  // ✅ Validation
  const validate = () => {
    const err = Validation("announce", state);
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
        await putData(EditData.announceid, state);
        notifySuccess("Announcement updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Announcement created successfully!");
      }

      setTimeout(() => {
        navigate("/announcerep");
      }, 1500);
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast.error("❌ Failed to save announcement. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Announcement" : "Create Announcement"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={state.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          </div>

          {/* Message */}
          <div className="form-group">
            <label>Message</label>
            <textarea
              value={state.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
          </div>

          {/* Posted By */}
          <div className="form-group">
            <label>Posted By</label>
            <input
              type="text"
              value={state.postedBy}
              onChange={(e) => handleChange("postedBy", e.target.value)}
            />
          </div>

          {/* Audience Type */}
          <div className="form-group">
            <label>Audience Type</label>
            <select
              value={state.audienceType}
              onChange={(e) => handleChange("audienceType", e.target.value)}
            >
              <option value="">Select Audience</option>
              <option value="All">All</option>
              <option value="Block">Block</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          {/* Block (when audience = Block/Flat) */}
          {state.audienceType !== "All" && (
            <div className="form-group">
              <label>Target Block</label>
              <select
                value={state.targetBlock}
                onChange={(e) => handleChange("targetBlock", e.target.value)}
              >
                <option value="">Select Block</option>
                {block.map((item) => (
                  <option key={item.blockId} value={item.blockName}>
                    {item.blockName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Flat (when audience = Flat) */}
          {state.audienceType === "Flat" && (
            <div className="form-group">
              <label>Target Flat</label>
              <select
                value={state.targetFlat}
                onChange={(e) => handleChange("targetFlat", e.target.value)}
              >
                <option value="">Select Flat</option>
                {flat.map((item) => (
                  <option key={item.flatId} value={item.flatName}>
                    {item.flatName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Attachment */}
          <div className="form-group">
            <label>Attachment</label>
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => handleChange("attach", e.target.files[0])}
            />
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
          </div>

          {/* Push Notification */}
          <div className="form-group">
            <label>Send Push Notification?</label>
            <select
              value={state.sendPush}
              onChange={(e) => handleChange("sendPush", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
