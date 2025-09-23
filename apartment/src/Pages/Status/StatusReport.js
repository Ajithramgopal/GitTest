import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function StatusReport() {
  const { data: statusData = [] } = useApi("status");

  const reportColumns = [
    { header: "Name", accessor: "name" },
    { header: "Code", accessor: "code" },
    { header: "Description", accessor: "description" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "statusId" },
    { header: "Delete", type: "delete", idKey: "statusId", table: "status" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Status Report"
        navigate="/status" // 👈 creation/edit form route
        tableHeaderColumns={reportColumns}
        data={statusData}
      />
    </div>
  );
}
