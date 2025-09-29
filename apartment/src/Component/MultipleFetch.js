// FetchResident.js
import React from "react";
import useApi from "./useApi";

export default function MultipleFetch({ passIds, mode }) {
  const { data: categories = [] } = useApi("category");

  // convert "5,6" → [5, 6]
  const ids = passIds ? passIds.split(",").map((id) => Number(id.trim())) : [];

  // filter matching categories
  const selectedCategories = categories.filter((c) => ids.includes(c.catId));

  // get names as a string
  const categoryName =
    selectedCategories.length > 0
      ? selectedCategories.map((c) => c.name).join(", ")
      : "N/A";

  // ✅ Render based on mode
  if (mode === "form") {
    return <input type="text" value={categoryName} readOnly />;
  }

  if (mode === "report") {
    return <span>{categoryName}</span>;
  }

  // fallback
  return <>{categoryName}</>;
}
