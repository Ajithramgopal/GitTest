import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Forming.css";
import GoBackButton from "../../components/GoBackButton";
import SelectDropdown from "../CustomHook/SelectDropdown";

export default function ReusableForm({
  title = "Form",
  fields = [],
  data = {},
  onChange,
  onSubmit,
  redirect,
  loading = false,
  isEdit = false,
  errorprint = {},
}) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>{isEdit ? `Edit ${title}` : `Create ${title}`}</h2>

      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}</label>

            {field.type === "select" ? (
              <SelectDropdown
                name={field.name}
                value={data[field.name] || ""}
                onChange={onChange}
                valueKey={field.valueKey || "id"}
                labelKey={field.labelKey || "name"}
                apiEndpoint={field.apiEndpoint}
                disabled={field.disabled}
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={data[field.name] || ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                disabled={field.disabled}
                required={field.required}
              />
            )}

            {errorprint?.[field.name] && (
              <p className="error" style={{ color: "red" }}>
                {errorprint[field.name]}
              </p>
            )}
          </div>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isEdit ? "Update" : "Submit"}
        </button>

        {redirect && <GoBackButton redirect={redirect} />}
      </form>
    </div>
  );
}
