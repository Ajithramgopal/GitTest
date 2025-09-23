import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function MaintenanceDueReport() {
  const { data: duesData = [] } = useApi("due");

  const reportColumns = [
    { header: "Resident ID", accessor: "residentId" },
    { header: "Amount", accessor: "amount" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "dueId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "dueId",
      table: "due",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Maintenance Dues Report"
        navigate="/maintenancedue" // 👈 form route
        tableHeaderColumns={reportColumns}
        data={duesData}
      />
    </div>
  );
}
