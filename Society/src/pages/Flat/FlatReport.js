import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";

export default function FlatReport() {
  const {
    getData: flat,
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("flat");

  const { search, setSearch, results } = useDebounceGet({
    tableName: "flat", // ✅ Correct table name here (was "Org" wrongly)
    searchField: "flatname", // ✅ Searching by block name
    delay: 300,
  });

  const filteredData = search ? results : flat;

  const columns = [
    { header: "Flatid", accessor: "flatid" },
    { header: "BlockName", accessor: "blockname" },
    { header: "FlatName", accessor: "flatname" },
    { header: "FlatNo", accessor: "flatno" },
  ];

  if (getLoading) return <p>Loading Flats...</p>;
  if (geterror) return <p>Error loading Flats: {geterror.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Flat Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
      />

      <ReportComponent
        title="Flat Report"
        data={filteredData}
        columns={columns}
        redirectPath="/flat"
        tableName="flat"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10} // optional: you can use this prop to limit initial data
      />
    </div>
  );
}
