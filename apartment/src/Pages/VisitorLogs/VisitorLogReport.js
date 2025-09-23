import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function VisitorLogReport() {
  const { data: visitorLogsData = [] } = useApi("visitlog"); // 👈 API endpoint

  const reportColumns = [
    { header: "Visitor ID", accessor: "visitorId" },
    { header: "Guard ID", accessor: "guardId" },
    { header: "Entry Time", accessor: "entryTime" },
    { header: "Exit Time", accessor: "exitTime" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    // { header: "Updated By", accessor: "updatedBy" },
    // { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "visitorLogsId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "visitorLogsId",
      table: "visitlog",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Visitor Logs Report"
        navigate="/visitorlog" // 👈 creation/edit form route
        tableHeaderColumns={reportColumns}
        data={visitorLogsData}
      />
    </div>
  );
}
