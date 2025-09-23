import React, { useState } from "react";
import SelectDropdown from "../CustomHook/SelectDropdown"; // adjust path if needed

export default function SelectList() {
  const [selectedBlock, setSelectedBlock] = useState("");

  return (
    <div>
      <h2>Choose a Block</h2>
      <SelectDropdown
        label="Block"
        onChange={(e) => setSelectedBlock(e.target.value)}
        valueKey="blockname"
      />
      <p>Selected: {selectedBlock}</p>
    </div>
  );
}
