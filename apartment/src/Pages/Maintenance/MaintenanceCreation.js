import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
import useFormState from "../../Component/useFormState";
import FetchName from "../../Component/FetchName";

import Select from "react-select";
import MultipleFetch from "../../Component/MultipleFetch";
import ImageUploader from "../../Component/ImageUploader";
export default function MaintenanceCreation() {
  const { state: maintenance, setState: setMaintenance } =
    useFormState("maintenance");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState([]);
  const editData = location.state || null;

  const { postData, putData } = useApi("maintenance");
  const { data: residentData = [] } = useApi("resident");
  const { data: blockData = [] } = useApi("block");
  const { data: flatData = [] } = useApi("flat");
  const { data: statusData = [] } = useApi("status");
  const { data: catData = [] } = useApi("category");

  // ✅ Pre-fill if editing
  useEffect(() => {
    if (editData) {
      setMaintenance({ ...editData });
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
  const handleCategoryChange = (selected) => {
    setSelectedOption(selected);
    const selectItems = selected.map((item) => item.value);
    const conSelectItems = selectItems.join(",");
    setMaintenance((prev) => ({
      ...prev,
      category: conSelectItems,
    }));
  };
  const handleRemoveImage = (index) => {
    setMaintenance((prev) => ({
      ...prev,
      attach: prev.attach.filter((_, i) => i !== index), // remove selected image
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
            <label>Resident</label>{" "}
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
            {/* {editData ? (
              <FetchName type="resident" id={Number(maintenance.residentId)} />
            ) : (
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
            )} */}
          </div>

          {/* Block */}
          <div className="form-group">
            <label>Block</label>
            <FetchName type="block" id={Number(maintenance.block)} />
          </div>

          {/* Flat */}
          <div className="form-group">
            <label>Flat</label>
            <FetchName type="flat" id={Number(maintenance.flat)} />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            {editData ? (
              <MultipleFetch passIds={maintenance.category} mode="form" />
            ) : (
              <Select
                isMulti
                options={catData.map((c) => ({
                  value: c.catId,
                  label: c.name,
                }))}
                value={selectedOption}
                onChange={handleCategoryChange}
              />
            )}
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
          {/*           
          <div className="form-group">
            <label>Attachment</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                handleChange("attach", Array.from(e.target.files))
              }
            />
          </div>

          {maintenance.attach && maintenance.attach.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              {maintenance.attach.map((file, index) => (
                <div
                  key={index}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    width="100"
                    height="100"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                      fontSize: "12px",
                      lineHeight: "20px",
                      textAlign: "center",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )} */}

          <ImageUploader
            label="Attachment"
            images={maintenance.attach}
            onChange={(newImages) =>
              setMaintenance((prev) => ({ ...prev, attach: newImages }))
            }
          />

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={maintenance.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Rating */}

          {editData ? (
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
          ) : null}

          {/* Feedback */}
          {editData ? (
            <div className="form-group">
              <label>Feedback</label>
              <textarea
                value={maintenance.feedBack || ""}
                onChange={(e) => handleChange("feedBack", e.target.value)}
              />
            </div>
          ) : null}

          <button type="submit">{editData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
