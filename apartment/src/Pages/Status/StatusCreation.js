import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function StatusCreation() {
  const { state, setState } = useFormState("status");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("status");

  useEffect(() => {
    if (EditData) {
      setState({
        ...EditData,
      });
    }
  }, [EditData]);

  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    const err = Validation("status", state);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };
  console.log("errors", errors);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (EditData) {
        await putData(EditData.statusId, state);
        notifySuccess("Status updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Status created successfully!");
      }

      setTimeout(() => {
        navigate("/statusrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving status:", error);
      toast.error("❌ Failed to save status. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Status" : "Create Status"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={state.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Code</label>
            <input
              type="text"
              value={state.code || ""}
              onChange={(e) => handleChange("code", e.target.value)}
            />
            {errors.code && <p style={{ color: "red" }}>{errors.code}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={state.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
