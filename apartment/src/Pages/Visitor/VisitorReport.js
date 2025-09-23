import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function VisitorReport() {
  const { data: visitorData = [] } = useApi("visitor"); // 👈 API endpoint for visitors

  const reportColumns = [
    { header: "Name", accessor: "name" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Purpose", accessor: "purpose" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
     { header: "Edit", type: "edit", idKey: "visitId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "visitId",
      table: "visitor",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Visitor Report"
        navigate="/visitor" // 👈 form route for create/edit
        tableHeaderColumns={reportColumns}
        data={visitorData}
      />
    </div>
  );
}
