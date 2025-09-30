import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";
import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import formatDateTimeLocal from "../../Component/formatDateTimeLocal";

export default function GateEntryCreation() {
  const { state, setState } = useFormState("visitor");
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("visitor");
  const { data: residentData = [] } = useApi("resident");
  const { data: visitorpurposeData = [] } = useApi("visitorpurpose");

  console.log("visitorpurposeData", visitorpurposeData);
  // ✅ Pre-fill for edit
  useEffect(() => {
    if (EditData) {
      setState({
        ...EditData,
        expectedTime: formatDateTimeLocal(EditData.expectedTime),
        entryTime: formatDateTimeLocal(EditData.entryTime),
      });
    }
  }, [EditData]);

  // ✅ OnChange
  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Validate
  const validate = () => {
    const err = Validation("gateentry", state);
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
        await putData(EditData.visitId, state);
        notifySuccess("Gate Entry updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Gate Entry created successfully!");
      }

      setTimeout(() => {
        navigate("/gateentryrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving gate entry:", error);
      toast.error("❌ Failed to save gate entry. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Gate Entry" : "Create Gate Entry"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* 🔽 All Fields */}
          <div className="form-group">
            <label>Resident</label>
            <input
              type="search"
              value={state.residentId || ""}
              onChange={(e) => handleChange("residentId", e.target.value)}
              list="residents"
            />

            <datalist id="residents">
              {residentData.map((item) => (
                <option key={item.residentId} value={item.residentId}>
                  {item.name}
                </option>
              ))}
            </datalist>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={state.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <PhoneInput
              defaultCountry="in"
              value={state.mobile}
              onChange={(phone) => handleChange("mobile", phone)}
            />
          </div>

          <div className="form-group">
            <label>Purpose</label>
            <select
              value={state.purpose || ""}
              onChange={(e) => handleChange("purpose", e.target.value)}
            >
              {visitorpurposeData.map((item, index) => (
                <option key={index} value={item.purposeId}>
                  {item.purpose}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Entry Time</label>
            <input
              type="datetime-local"
              value={state.entryTime || ""}
              onChange={(e) => handleChange("entryTime", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Exit Time</label>
            <input
              type="datetime-local"
              value={state.exitTime || ""}
              onChange={(e) => handleChange("exitTime", e.target.value)}
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
            <label>Entry Method</label>
            <input
              type="text"
              value={state.entryMethod || ""}
              onChange={(e) => handleChange("entryMethod", e.target.value)}
            />
          </div>
          {/* 
          <div className="form-group">
            <label>OTP Code</label>
            <input
              type="text"
              value={state.otpCode || ""}
              onChange={(e) => handleChange("otpCode", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>QR Code URL</label>
            <input
              type="text"
              value={state.qrCodeurl || ""}
              onChange={(e) => handleChange("qrCodeurl", e.target.value)}
            />
          </div> */}

          <div className="form-group">
            <label>Vehicle No</label>
            <input
              type="text"
              value={state.vehicleNo || ""}
              onChange={(e) => handleChange("vehicleNo", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <input
              type="text"
              value={state.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
