import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function RoleReport() {
  const { data: roleData = [] } = useApi("role"); // 👈 API endpoint for roles

  const reportColumns = [
    { header: "Role", accessor: "role" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "roleId" },
    { header: "Delete", type: "delete", idKey: "roleId", table: "role" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Role Report"
        navigate="/role" // 👈 form route for add/edit
        tableHeaderColumns={reportColumns}
        data={roleData}
      />
    </div>
  );
}
