import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function VisitorPurposeCreation() {
  const { state, setState } = useFormState("visitorpurpose");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("visitorpurpose");

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
    const err = Validation("visitorpurpose", state);
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
        await putData(EditData.purposeId, state);
        notifySuccess("Visitor Purpose updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Visitor Purpose created successfully!");
      }

      // ⏳ Delay navigation so toast is visible
      setTimeout(() => {
        navigate("/visitorpurposerep");
      }, 1500);
    } catch (error) {
      console.error("Error saving visitor purpose:", error);
      toast.error("❌ Failed to save visitor purpose. Try again!");
    }
  };
  return (
    <>
      <h1>{EditData ? "Edit Visitor Purpose" : "Create Visitor Purpose"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Purpose */}
          <div className="form-group">
            <label>Purpose</label>
            <input
              type="text"
              value={state.purpose || ""}
              onChange={(e) => handleChange("purpose", e.target.value)}
            />
            {errors.purpose && <p style={{ color: "red" }}>{errors.purpose}</p>}
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Notes</label>
            <input
              type="text"
              value={state.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
            {errors.notes && <p style={{ color: "red" }}>{errors.notes}</p>}
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
