import React, { useState, useEffect } from "react";
import CreateButton from "../Component/CreateButton";
import EditButton from "../Component/EditButton";
import DeleteButton from "../Component/DeleteButton";
import SearchComponent from "../Component/SearchComponent";

export default function ReportTable({
  tableHeaderColumns,
  headerName,
  data,
  navigate,
}) {
  const [filteredData, setFilteredData] = useState(data);

  // 🔑 Update filtered data if original data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // 🔑 Auto-detect primary key column for row key
  const primaryKeyCol = tableHeaderColumns.find(
    (col) => col.type === "edit" || col.type === "delete"
  );
  const primaryKey = primaryKeyCol
    ? primaryKeyCol.idKey || primaryKeyCol.accessor
    : null;

  // 🔑 Columns to search (exclude edit/delete)
  const searchColumns = tableHeaderColumns
    .filter((col) => !col.type)
    .map((col) => col.accessor);

  return (
    <>
      <div className="header-container">
        <div>
          <h1>{headerName}</h1>
        </div>
        <div>
          <CreateButton redirect={navigate} />
        </div>
      </div>
      <hr></hr>
      {/* ✅ Search filter */}
      <SearchComponent
        data={data}
        onSearch={setFilteredData}
        columns={searchColumns}
      />

      <div className="report-container">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {tableHeaderColumns.map((col, index) => (
                  <th key={index}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <tr key={primaryKey ? row[primaryKey] : rowIndex}>
                    {tableHeaderColumns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {col.type === "edit" ? (
                          <EditButton redirectPath={navigate} row={row} />
                        ) : col.type === "delete" ? (
                          <DeleteButton
                            id={row[col.idKey || col.accessor]}
                            tableName={col.table || ""}
                          />
                        ) : (
                          row[col.accessor] ?? "-"
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaderColumns.length}
                    style={{ textAlign: "center" }}
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
