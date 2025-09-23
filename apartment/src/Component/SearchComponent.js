// SearchComponent.jsx
import React, { useEffect, useState } from "react";

export default function SearchComponent({ data, onSearch, columns }) {
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query != null) {
      const handler = setTimeout(() => {
        if (!query) {
          onSearch(data); // reset
          return;
        }

        const filtered = data.filter((row) =>
          Object.keys(row).some((col) =>
            row[col]?.toString().toLowerCase().includes(query.toLowerCase())
          )
        );
        onSearch(filtered);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [query]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={handleSearch}
      style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
    />
  );
}
