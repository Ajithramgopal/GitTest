import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ correct plugin import
import usePdfGenerate from "../CustomHook/usePdfGenerate";
export default function UserReport() {
  const {
    getData: user = [], // default fallback
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("user");

  const {
    search,
    setSearch,
    results = [],
  } = useDebounceGet({
    tableName: "user",
    searchField: "username",
    delay: 300,
  });

  const filteredData = search ? results : user;

  const columns = [
    { header: "UserId", accessor: "userid" },
    { header: "UserName", accessor: "username" },
    { header: "Block", accessor: "block" },
    { header: "FlatNo", accessor: "flat" },
    { header: "Role", accessor: "role" },
  ];
  const { generatePDF } = usePdfGenerate({ columns, rows: filteredData });

  if (getLoading) return <p>Loading users...</p>;
  if (geterror) return <p>Error loading users: {geterror.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
      />

      {/* ✅ Download PDF Button */}
      <button
        onClick={generatePDF}
        style={{
          padding: "8px 12px",
          marginBottom: "10px",
          marginLeft: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>

      <ReportComponent
        title="User Report"
        data={filteredData}
        columns={columns}
        redirectPath="/user"
        tableName="user"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10}
      />
    </div>
  );
}
