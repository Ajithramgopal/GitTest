import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function ResidentsReport() {
  const { data: residentsData = [] } = useApi("resident"); // 👈 API endpoint

  const reportColumns = [
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "residentId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "residentId",
      table: "resident",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Residents Report"
        navigate="/resident" // 👈 Form route
        tableHeaderColumns={reportColumns}
        data={residentsData}
      />
    </div>
  );
}
