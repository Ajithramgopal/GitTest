import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";

export default function VisitorReport() {
  const {
    getData: visitor,
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("visitors");

  const { search, setSearch, results } = useDebounceGet({
    tableName: "visitors",
    searchField: "name",
    delay: 300,
  });

  const filteredData = search ? results : visitor;

  const columns = [
    { header: "visitId", accessor: "visitId" },
    { header: "residentId", accessor: "residentId" },
    { header: "name", accessor: "name" },
    { header: "status", accessor: "status" },
  ];

  if (getLoading) return <p>Loading visitors...</p>;
  if (geterror) return <p>Error loading visitors: {geterror.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by visitors..." // ✅ Fixed placeholder
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
      />

      <ReportComponent
        title="Visitors Report"
        data={filteredData}
        columns={columns}
        redirectPath="/visitor"
        tableName="visitors"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10}
      />
    </div>
  );
}
