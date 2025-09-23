import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function FlatCreation() {
  const { state, setState } = useFormState("flat");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("flat");
  const { data: block = [] } = useApi("block");

  // ✅ Pre-fill when editing
  useEffect(() => {
    if (EditData) {
      setState({
        ...EditData,
      });
    }
  }, [EditData]);
  // console.log(state);
  // ✅ OnChange function
  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Validation
  const validate = () => {
    const err = Validation("flat", state);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };

  // console.log("errors", errors);
  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (EditData) {
        await putData(EditData.flatId, state);
        notifySuccess("Flat updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Flat created successfully!");
      }

      setTimeout(() => {
        navigate("/flatrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving flat:", error);
      toast.error("❌ Failed to save flat. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Flat" : "Create Flat"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Block */}
          <div className="form-group">
            <label>Block</label>
            <select
              value={state.blockName}
              onChange={(e) => handleChange("blockName", e.target.value)}
            >
              <option value="">Select Block</option>
              {block.map((item) => (
                <option key={item.blockId} value={item.blockName}>
                  {item.blockName}
                </option>
              ))}
            </select>
            {errors.blockName && (
              <p style={{ color: "red" }}>{errors.blockName}</p>
            )}
          </div>

          {/* Flat No */}
          <div className="form-group">
            <label>Flat No</label>
            <input
              type="text"
              value={state.flatNo}
              onChange={(e) => handleChange("flatNo", e.target.value)}
            />
            {errors.flatNo && <p style={{ color: "red" }}>{errors.flatNo}</p>}
          </div>

          {/* Flat Name */}
          <div className="form-group">
            <label>Flat Name</label>
            <input
              type="text"
              value={state.flatName}
              onChange={(e) => handleChange("flatName", e.target.value)}
            />
            {errors.flatName && (
              <p style={{ color: "red" }}>{errors.flatName}</p>
            )}
          </div>

          {/* Owner Name */}
          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="text"
              value={state.ownerName}
              onChange={(e) => handleChange("ownerName", e.target.value)}
            />
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              value={state.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
            />
            {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
