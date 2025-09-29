import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function VisitorPurposeReport() {
  const { data: visitorPurposeData = [] } = useApi("visitorpurpose"); // 👈 API endpoint

  const reportColumns = [
    { header: "Purpose", accessor: "purpose" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "purposeId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "purposeId",
      table: "visitorpurpose",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Visitor Purpose Report"
        navigate="/visitorpurpose" // 👈 route for create/edit form
        tableHeaderColumns={reportColumns}
        data={visitorPurposeData}
      />
    </div>
  );
}
