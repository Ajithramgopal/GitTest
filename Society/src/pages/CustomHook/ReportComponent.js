import "../Css/Report.css";
import { useNavigate } from "react-router-dom";
import useDeleteApi from "../CustomHook/useDeleteApi";
import CreateButton from "../../components/CreateButton";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";

export default function ReportComponent({
  title,
  data = [], // ✅ Default empty array to avoid null/undefined
  columns,
  redirectPath,
  tableName,
  enableEdit = false,
  enableDelete = false,
  refreshData = () => {},
}) {
  const navigate = useNavigate();
  const { deleteItem } = useDeleteApi(tableName);

  return (
    <div className="report-container">
      <h3>{title}</h3>

      <CreateButton redirect={redirectPath} />

      {data.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {enableEdit && <th>Edit</th>}
                {columns.map((col) => (
                  <th key={col.accessor}>{col.header}</th>
                ))}
                {enableDelete && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id || row[columns[0].accessor] || `row-${index}`} // ✅ Safe key fallback
                >
                  {enableEdit && (
                    <td>
                      <EditButton redirectPath={redirectPath} row={row} />
                    </td>
                  )}

                  {columns.map((col) => (
                    <td key={col.accessor}>{row[col.accessor]}</td>
                  ))}

                  {enableDelete && (
                    <td>
                      <DeleteButton
                        columns={columns}
                        row={row}
                        deleteItem={deleteItem}
                        refreshData={refreshData}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
