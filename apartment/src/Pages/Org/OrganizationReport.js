import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function OrganizationReport() {
  const { data: orgData = [] } = useApi("org"); // 👈 API endpoint for organization

  const reportColumns = [
    { header: "Organization Name", accessor: "orgName" },
    { header: "Status", accessor: "status" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "orgId" },
    { header: "Delete", type: "delete", idKey: "orgId", table: "org" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Organization Report"
        navigate="/org" // 👈 form route for add/edit
        tableHeaderColumns={reportColumns}
        data={orgData}
      />
    </div>
  );
}
