import "../Css/Report.css";
import useDebounceGet from "../CustomHook/useDebounceGet";
import ReportComponent from "../CustomHook/ReportComponent";
import useGetApi from "../CustomHook/useGetApi";

export default function TicketReport() {
  const {
    getData: tickets,
    getLoading,
    geterror,
    refreshData,
  } = useGetApi("ticket");

  const { search, setSearch, results } = useDebounceGet({
    tableName: "ticket", // ✅ Correct table name here (was "Org" wrongly)
    searchField: "ticketname", // ✅ Searching by block name
    delay: 300,
  });

  const filteredData = search ? results : tickets;

  const columns = [
    { header: "Ticket ID", accessor: "ticketid" },
    { header: "Ticket Name", accessor: "ticketname" },
    { header: "Block ", accessor: "block" },
    { header: "Flat ", accessor: "flat" },
  ];

  if (getLoading) return <p>Loading blocks...</p>;
  if (geterror) return <p>Error loading blocks: {geterror.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Block Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
      />

      <ReportComponent
        title="Ticket Report"
        data={filteredData}
        columns={columns}
        redirectPath="/tic"
        tableName="ticket"
        enableEdit={true}
        enableDelete={true}
        refreshData={refreshData}
        maxRows={10} // optional: you can use this prop to limit initial data
      />
    </div>
  );
}
