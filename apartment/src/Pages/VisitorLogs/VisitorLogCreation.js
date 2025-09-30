import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";
import GetDate from "../../Component/GetDate";
export default function VisitorLogCreation() {
  const { state, setState } = useFormState("visitorlogs");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("visitlog");
  const { data: visitorData = [] } = useApi("visitor");
  const { data: visitorPurpose = [] } = useApi("visitorpurpose");
  const { getLocalDateTime } = GetDate();
  const { state: visitor, setState: setVisitor } = useFormState("visitor");

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

  const handleChangeVisitor = (value) => {
    console.log("value", value);
    setState((prev) => ({
      ...prev,
    }));
  };
  // ✅ Validation
  const validate = () => {
    const err = Validation("visitorLogs", state);
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
        await putData(EditData.visitorLogsId, state);
        notifySuccess("Visitor log updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Visitor log created successfully!");
      }

      setTimeout(() => {
        navigate("/visitorlogrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving visitor log:", error);
      toast.error("❌ Failed to save visitor log. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Visitor Log" : "Create Visitor Log"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* visitorId */}
          <div className="form-group">
            <label>Visitor</label>
            <select
              value={state.visitorId || ""}
              onChange={
                (e) => handleChangeVisitor(e.target.value)
                // handleVisitor("visitorId", Number(e.target.value))
              }
            >
              <option value="">-- Select Visitor --</option>
              {visitorData.map((item, index) => (
                <option key={index} value={item.visitorId}>
                  {item.name} ({item.mobile})
                </option>
              ))}
            </select>
            {errors.visitorId && (
              <p style={{ color: "red" }}>{errors.visitorId}</p>
            )}
          </div>

          {/* guardId */}
          <div className="form-group">
            <label>Guard ID</label>
            <input
              type="number"
              value={state.guardId || ""}
              onChange={(e) => handleChange("guardId", Number(e.target.value))}
            />
            {errors.guardId && <p style={{ color: "red" }}>{errors.guardId}</p>}
          </div>

          {/* entryTime */}
          <div className="form-group">
            <label>Entry Time</label>
            {/* <input
              type="datetime-local"
              value={state.entryTime || ""}
              onChange={(e) => handleChange("entryTime", e.target.value)}
            /> */}

            <input
              type="datetime-local"
              value={state.entryTime || getLocalDateTime()}
              onChange={(e) => handleChange("entryTime", e.target.value)}
            />

            {errors.entryTime && (
              <p style={{ color: "red" }}>{errors.entryTime}</p>
            )}
          </div>

          {/* exitTime */}
          <div className="form-group">
            <label>Exit Time</label>
            <input
              type="datetime-local"
              value={state.exitTime || ""}
              onChange={(e) => handleChange("exitTime", e.target.value)}
            />
            {errors.exitTime && (
              <p style={{ color: "red" }}>{errors.exitTime}</p>
            )}
          </div>

          {/* verifiyType */}
          <div className="form-group">
            <label>Verify Type</label>
            <input
              type="text"
              value={state.verifiyType || ""}
              onChange={(e) => handleChange("verifiyType", e.target.value)}
            />
            {errors.verifiyType && (
              <p style={{ color: "red" }}>{errors.verifiyType}</p>
            )}
          </div>

          {/* notes */}
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
