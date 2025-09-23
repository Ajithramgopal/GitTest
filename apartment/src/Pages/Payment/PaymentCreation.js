import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function PaymentCreation() {
  const { state, setState } = useFormState("payments");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("payment");

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
    const err = Validation("payments", state);
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
        await putData(EditData.paymentId, state);
        notifySuccess("Payment updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Payment created successfully!");
      }

      setTimeout(() => {
        navigate("/paymentrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving payment:", error);
      toast.error("❌ Failed to save payment. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Payment" : "Create Payment"}</h1>
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
            <label>Due ID</label>
            <input
              type="number"
              value={state.dueId || ""}
              onChange={(e) => handleChange("dueId", e.target.value)}
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
            <label>Payment Method</label>
            <input
              type="text"
              value={state.paymentMethod || ""}
              onChange={(e) => handleChange("paymentMethod", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Transaction ID</label>
            <input
              type="text"
              value={state.transactionId || ""}
              onChange={(e) => handleChange("transactionId", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              value={state.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Paid At</label>
            <input
              type="datetime-local"
              value={state.paidAt || ""}
              onChange={(e) => handleChange("paidAt", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Receipt URL</label>
            <input
              type="text"
              value={state.receiptUrl || ""}
              onChange={(e) => handleChange("receiptUrl", e.target.value)}
            />
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
