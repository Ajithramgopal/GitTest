import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";
export default function MaintenanceReport() {
  const {
    getData: maintenance,
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("maintenance");

  const { search, setSearch, results } = useDebounceGet({
    tableName: "maintenance",
    searchField: "name",
    delay: 300,
  });

  const filteredData = search ? results : maintenance;

  const columns = [
    { header: "maintainId", accessor: "maintainId" },
    { header: "UserName", accessor: "username" },
    { header: "Block", accessor: "block" },
    { header: "FlatNo", accessor: "flat" },
    { header: "status", accessor: "status" },
  ];

  if (getLoading) return <p>Loading users...</p>;
  if (geterror) return <p>Error loading users: {geterror.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Username..." // ✅ Fixed placeholder
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
      />

      <ReportComponent
        title="Maintenance Report"
        data={filteredData}
        columns={columns}
        redirectPath="/maintenance"
        tableName="maintenance"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10}
      />
    </div>
  );
}
