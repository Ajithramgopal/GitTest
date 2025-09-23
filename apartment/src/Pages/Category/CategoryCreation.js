import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function CategoryCreation() {
  const { state, setState } = useFormState("category");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("category");

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
    const err = Validation("category", state);
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
        await putData(EditData.catId, state);
        notifySuccess("Category updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Category created successfully!");
      }

      setTimeout(() => {
        navigate("/categoryrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("❌ Failed to save category. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Category" : "Create Category"}</h1>
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
