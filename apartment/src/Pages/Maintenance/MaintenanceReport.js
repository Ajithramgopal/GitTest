import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function MaintenanceReport() {
  const { data: maintenanceData = [] } = useApi("maintenance"); // 👈 API endpoint for maintenance

  const reportColumns = [
    { header: "Maintenance ID", accessor: "maintainId" },
    { header: "Resident ID", accessor: "residentId" },
    { header: "Block", accessor: "block" },
    { header: "Flat", accessor: "flat" },
    { header: "Category", accessor: "category" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },

    { header: "Edit", type: "edit", idKey: "maintainId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "maintainId",
      table: "maintenance",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Maintenance Report"
        navigate="/maintenance" // 👈 form route for create/edit
        tableHeaderColumns={reportColumns}
        data={maintenanceData}
      />
    </div>
  );
}
