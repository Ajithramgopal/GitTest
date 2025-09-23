import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
import useFormState from "../../Component/useFormState";
import QRCode from "react-qr-code";

export default function VisitorCreation() {
  const { state: visitor, setState: setVisitor } = useFormState("visitor");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state || null;
  const { postData, putData } = useApi("visitor");

  // ✅ Prefill data for Edit
  useEffect(() => {
    if (editData) {
      setVisitor({
        ...editData,
      });
    }
  }, [editData]);

  // ✅ Change handler
  const handleChange = (key, value) => {
    setVisitor((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Validation
  const validate = () => {
    const err = Validation("visitor", visitor);
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
        await putData(editData.visitId, visitor);
        notifySuccess("Visitor updated successfully!");
      } else {
        await postData(visitor);
        notifySuccess("Visitor added successfully!");
      }

      setTimeout(() => {
        navigate("/visitorrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving visitor:", error);
      toast.error("❌ Failed to save visitor. Try again!");
    }
  };

  return (
    <>
      <h1>{editData ? "Edit Visitor" : "Add Visitor"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Visitor Name */}
          <div className="form-group">
            <label>Visitor Name</label>
            <input
              type="text"
              value={visitor.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label>Mobile</label>
            <PhoneInput
              defaultCountry="in"
              value={visitor.mobile}
              onChange={(phone) => handleChange("mobile", phone)}
            />
            {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
          </div>

          {/* Purpose */}
          <div className="form-group">
            <label>Purpose</label>
            <input
              type="text"
              value={visitor.purpose || ""}
              onChange={(e) => handleChange("purpose", e.target.value)}
            />
          </div>

          {/* Expected Time */}
          <div className="form-group">
            <label>Expected Time</label>
            <input
              type="datetime-local"
              value={visitor.expectedTime || ""}
              onChange={(e) => handleChange("expectedTime", e.target.value)}
            />
          </div>

          {/* Entry Time */}
          <div className="form-group">
            <label>Entry Time</label>
            <input
              type="datetime-local"
              value={visitor.entryTime || ""}
              onChange={(e) => handleChange("entryTime", e.target.value)}
            />
          </div>

          {/* Exit Time */}
          <div className="form-group">
            <label>Exit Time</label>
            <input
              type="datetime-local"
              value={visitor.exitTime || ""}
              onChange={(e) => handleChange("exitTime", e.target.value)}
            />
          </div>

          {/* Vehicle No */}
          <div className="form-group">
            <label>Vehicle Number</label>
            <input
              type="text"
              value={visitor.vehicleNo || ""}
              onChange={(e) => handleChange("vehicleNo", e.target.value)}
            />
          </div>

          {/* Photo Upload */}
          <div className="form-group">
            <label>Upload Photo</label>
            <input
              type="file"
              onChange={(e) => handleChange("photoUrl", e.target.files[0])}
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={visitor.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>
          <div
            style={{ marginTop: "20px", background: "white", padding: "16px" }}
          >
            <QRCode
              value={JSON.stringify({
                name: visitor.name || "N/A",
                mobile: visitor.mobile || "N/A",
                date: visitor.expectedTime || "N/A",
              })}
              size={200}
            />
          </div>
          <button type="submit">{editData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
