import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
import useFormState from "../../Component/useFormState";
import FetchBlock from "../../Component/FetchBlock";
import FetchFlat from "../../Component/FetchFlat";
import FetchName from "../../Component/FetchName";

export default function MaintenanceCreation() {
  const { state: maintenance, setState: setMaintenance } =
    useFormState("maintenance");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state || null;

  const { postData, putData } = useApi("maintenance");
  const { data: residentData = [] } = useApi("resident");
  const { data: blockData = [] } = useApi("block");
  const { data: flatData = [] } = useApi("flat");
  const { data: statusData = [] } = useApi("status");
  const { data: catData = [] } = useApi("category");
  // const { blockName } = FetchBlk((blockId = editData?.blockName));
  // console.log("blockName", blockName);
  // ✅ Pre-fill if editing
  useEffect(() => {
    if (editData) {
      setMaintenance({ ...editData });
      // const blk = editData.filter((item) => item.block === editData);
      // console.log("blk", blk);
    }
  }, [editData]);

  // ✅ Generic handle change
  const handleChange = (key, value) => {
    setMaintenance((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Auto-fill Block + Flat when Resident changes
  const handleResidentChange = (residentId) => {
    const selectedResident = residentData.find(
      (r) => r.residentId === Number(residentId)
    );

    if (!selectedResident) return;

    setMaintenance((prev) => ({
      ...prev,
      residentId: Number(residentId),
      block: selectedResident.blockId,
      flat: selectedResident.flatId,
    }));
  };

  console.log("maintenance", maintenance);
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
        navigate("/maintenancerep");
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
            <select
              value={maintenance.residentId || ""}
              onChange={(e) => handleResidentChange(e.target.value)}
            >
              <option value="">Select Resident</option>
              {residentData.map((item) => (
                <option key={item.residentId} value={item.residentId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Block */}
          <div className="form-group">
            <label>Block</label>
            {editData ? (
              <select
                value={maintenance.block || ""}
                onChange={(e) => handleChange("block", Number(e.target.value))}
              >
                <option value="">Select Block</option>
                {blockData.map((b) => (
                  <option key={b.blockId} value={b.blockId}>
                    {b.blockName}
                  </option>
                ))}
              </select>
            ) : (
              // <FetchBlock blockId={maintenance.block} />

              <FetchName type="block" id={Number(maintenance.block)} />
            )}
          </div>
          {/* Flat */}
          <div className="form-group">
            <label>Flat</label>
            {editData ? (
              <select
                value={maintenance.flat || ""}
                onChange={(e) => handleChange("flat", Number(e.target.value))}
              >
                <option value="">Select Flat</option>
                {flatData.map((b) => (
                  <option key={b.flatId} value={b.flatId}>
                    {b.flatName}
                  </option>
                ))}
              </select>
            ) : (
              // <FetchFlat flatId={maintenance.flat} />

              <FetchName type="flat" id={Number(maintenance.flat)} />
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select
              value={maintenance.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Select category</option>
              {catData.map((c) => (
                <option key={c.catId} value={c.catId}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              value={maintenance.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select Status</option>
              {statusData.map((s) => (
                <option key={s.statusId} value={s.statusId}>
                  {s.name}
                </option>
              ))}
            </select>
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

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={maintenance.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
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
