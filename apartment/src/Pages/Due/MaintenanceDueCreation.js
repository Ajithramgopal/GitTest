import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function MaintenanceDueCreation() {
  const { state, setState } = useFormState("maintenanceDues");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("due");

  useEffect(() => {
    if (EditData) {
      setState({ ...EditData });
    }
  }, [EditData]);

  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    const err = Validation("maintenanceDues", state);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (EditData) {
        await putData(EditData.dueId, state);
        notifySuccess("Maintenance Due updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Maintenance Due created successfully!");
      }

      setTimeout(() => {
        navigate("/maintenanceduerep");
      }, 1500);
    } catch (error) {
      console.error("Error saving due:", error);
      toast.error("❌ Failed to save due. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Maintenance Due" : "Create Maintenance Due"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Resident ID</label>
            <input
              type="number"
              value={state.residentId || ""}
              onChange={(e) => handleChange("residentId", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={state.amount || ""}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Due Month</label>
            <input
              type="text"
              value={state.dueMonth || ""}
              onChange={(e) => handleChange("dueMonth", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={state.dueDate || ""}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
