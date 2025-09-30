import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function MaintenancePayTypeCreation() {
  const { state, setState } = useFormState("maintenancePayType");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("maintenancepay");

  // ✅ Pre-fill form on edit
  useEffect(() => {
    if (EditData) {
      setState({
        ...EditData,
      });
    }
  }, [EditData]);

  // ✅ Handle Change
  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Validation
  const validate = () => {
    const err = Validation("maintenancePayType", state);
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
        await putData(EditData.typeId, state);
        notifySuccess("Maintenance Pay Type updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Maintenance Pay Type created successfully!");
      }

      setTimeout(() => {
        navigate("/maintenancepayrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving maintenance pay type:", error);
      toast.error("❌ Failed to save maintenance pay type. Try again!");
    }
  };

  return (
    <>
      <h1>
        {EditData ? "Edit Maintenance Pay Type" : "Create Maintenance Pay Type"}
      </h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Flat Type</label>
            <input
              type="text"
              name="flatType"
              value={state.flatType}
              onChange={(e) => handleChange("flatType", e.target.value)}
            />
            {errors.flatType && (
              <p style={{ color: "red" }}>{errors.flatType}</p>
            )}
          </div>

          <div className="form-group">
            <label>Sqft</label>
            <input
              type="number"
              name="sqft"
              value={state.sqft}
              onChange={(e) => handleChange("sqft", e.target.value)}
            />
            {errors.sqft && <p style={{ color: "red" }}>{errors.sqft}</p>}
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={state.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
            {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
