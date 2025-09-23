import React from "react";
import useDebounceGet from "./CustomHook/useDebounceGet";

export default function SearchBox() {
  const { search, setSearch, results } = useDebounceGet({
    tableName: "Org",
    searchField: "orgname",
    delay: 300,
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Organizations</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((org) => (
              <tr key={org.orgid}>
                <td>{org.orgid}</td>
                <td>{org.orgname}</td>
                <td>{org.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                {search.trim() === ""
                  ? "Start typing to search..."
                  : "No results found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
