import React, { useState } from "react";

export default function MultiSelectExample() {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = ["Apple", "Banana", "Orange", "Mango", "Grapes"];

  const handleChange = (e) => {
    // get all selected options
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(values);
  };

  return (
    <div>
      <h2>Multi Select Dropdown</h2>
      <select multiple value={selectedValues} onChange={handleChange}>
        {options.map((fruit, index) => (
          <option key={index} value={fruit}>
            {fruit}
          </option>
        ))}
      </select>

      <div>
        <h3>Selected:</h3>
        <ul>
          {selectedValues.map((val, index) => (
            <li key={index}>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
