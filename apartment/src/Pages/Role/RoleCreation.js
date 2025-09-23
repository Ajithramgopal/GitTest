import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function RoleCreation() {
  const { state, setState } = useFormState("role");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("role");

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

  // ✅ Validation
  const validate = () => {
    const err = Validation("role", state);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };
  console.log("role", errors);
  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (EditData) {
        await putData(EditData.roleId, state);
        notifySuccess("Role updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Role created successfully!");
      }

      setTimeout(() => {
        navigate("/rolerep");
      }, 1500);
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error("❌ Failed to save role. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Role" : "Create Role"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Role Name */}
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={state.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
            {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
