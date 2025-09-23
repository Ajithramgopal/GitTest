import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";

export default function AnnouceReport() {
  const {
    getData: user,
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("announce");

  const { search, setSearch, results } = useDebounceGet({
    tableName: "announce",
    searchField: "username",
    delay: 300,
  });

  const filteredData = search ? results : user;

  const columns = [
    { header: "UserId", accessor: "userid" },
    { header: "UserName", accessor: "username" },
    { header: "Block", accessor: "block" },
    { header: "FlatNo", accessor: "flat" },
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
        title="User Report"
        data={filteredData}
        columns={columns}
        redirectPath="/announce"
        tableName="announce"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10}
      />
    </div>
  );
}
