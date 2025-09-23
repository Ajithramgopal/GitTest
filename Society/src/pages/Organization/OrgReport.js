import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";

export default function OrgReport() {
  const {
    getData: user,
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("organization");

  const { search, setSearch, results } = useDebounceGet({
    tableName: "organization",
    searchField: "username",
    delay: 300,
  });

  const filteredData = search ? results : user;

  const columns = [
    { header: "orgid", accessor: "orgid" },
    { header: "orgname", accessor: "orgname" },
    { header: "status", accessor: "status" },
    { header: "startDate", accessor: "startDate" },
  ];

  if (getLoading) return <p>Loading users...</p>;
  if (geterror) return <p>Error loading users: {geterror.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by OrgName..." // ✅ Fixed placeholder
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
      />

      <ReportComponent
        title="Organization Report"
        data={filteredData}
        columns={columns}
        redirectPath="/org"
        tableName="org"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10}
      />
    </div>
  );
}
