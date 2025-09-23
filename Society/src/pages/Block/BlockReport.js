import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";

export default function BlockReport() {
  const {
    getData: user,
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("block");

  const { search, setSearch, results } = useDebounceGet({
    tableName: "block",
    searchField: "blockname",
    delay: 300,
  });

  const filteredData = search ? results : user;

  const columns = [
    { header: "BlockId", accessor: "blockid" },
    { header: "BlockName", accessor: "blockname" },
    { header: "Flat Count", accessor: "flatcount" },
    { header: "Created", accessor: "createdby" },
    { header: "Createddate", accessor: "createddate" },
    { header: "Updated", accessor: "updatedby" },
    { header: "Updateddate", accessor: "updateddate" },
  ];

  if (getLoading) return <p>Loading Blocks...</p>;
  if (geterror) return <p>Error loading Blocks: {geterror.message}</p>;

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
        title="Block Report"
        data={filteredData}
        columns={columns}
        redirectPath="/block"
        tableName="block"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10}
      />
    </div>
  );
}
