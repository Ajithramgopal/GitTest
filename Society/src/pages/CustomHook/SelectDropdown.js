import React from "react";
import useGetApi from "../CustomHook/useGetApi"; // Update path if needed

export default function SelectDropdown({
  label = "Select",
  name,
  value = "",
  onChange,
  valueKey = "id",
  labelKey = "name",
  apiEndpoint = "block",
  disabled = false,
  required = false,
}) {
  const {
    getData: dropData = [],
    getLoading,
    getError,
  } = useGetApi(apiEndpoint);

  return (
    <div>
      <label>{label}</label>
      {getLoading ? (
        <p>Loading...</p>
      ) : getError ? (
        <p style={{ color: "red" }}>Error loading data</p>
      ) : (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          disabled={disabled}
          required={required}
        >
          <option value="">-- Select --</option>
          {dropData.map((item, index) => (
            <option key={index} value={item[valueKey]}>
              {item[labelKey]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
