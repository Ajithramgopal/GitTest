import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Css/Form.css";

import useApi from "../../Component/useApi";
import Validation from "../../Component/Validation";
import useFormState from "../../Component/useFormState";
import { toast } from "react-toastify";
import { notifySuccess } from "../../Component/ToastNotification";

export default function BlockCreation() {
  const { state, setState } = useFormState("block");

  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const EditData = location.state || null;
  const { putData, postData } = useApi("block");

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

  console.log("state", state);
  // ✅ Validation function
  const validate = () => {
    const err = Validation("block", state);
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return false;
    }
    setErrors({});
    return true;
  };

  // console.log("err", errors);
  // ✅ Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (EditData) {
        await putData(EditData.blockId, state);
        notifySuccess("Block updated successfully!");
      } else {
        await postData(state);
        notifySuccess("Block created successfully!");
      }

      // ⏳ Delay navigation so toast is visible
      setTimeout(() => {
        navigate("/blockrep");
      }, 1500);
    } catch (error) {
      console.error("Error saving block:", error);
      toast.error("❌ Failed to save block. Try again!");
    }
  };

  return (
    <>
      <h1>{EditData ? "Edit Block" : "Create Block"}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Block Name</label>
            <input
              type="text"
              name="blockName"
              value={state.blockName}
              onChange={(e) => handleChange("blockName", e.target.value)}
            />
            {errors.blockName && (
              <p style={{ color: "red" }}>{errors.blockName}</p>
            )}
          </div>

          <div className="form-group">
            <label>Flat Count</label>
            <input
              type="number"
              name="flatCount"
              value={state.flatCount}
              onChange={(e) => handleChange("flatCount", e.target.value)}
            />
            {errors.flatCount && (
              <p style={{ color: "red" }}>{errors.flatCount}</p>
            )}
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={state.desc}
              onChange={(e) => handleChange("desc", e.target.value)}
            />
            {errors.desc && <p style={{ color: "red" }}>{errors.desc}</p>}
          </div>

          <button type="submit">{EditData ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}
