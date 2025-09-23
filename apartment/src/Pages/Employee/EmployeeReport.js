import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function EmployeeReport() {
  const { data: residentData = [] } = useApi("employee"); // 👈 adjust API endpoint name if needed

  const reportColumns = [
    { header: "Name", accessor: "name" },
    { header: "Block", accessor: "block" },
    { header: "Flat", accessor: "flat" },
    { header: "Created By", accessor: "createdby" },
    { header: "Created Date", accessor: "createddate" },
    { header: "Updated By", accessor: "updatedby" },
    { header: "Updated Date", accessor: "updateddate" },

    { header: "Edit", type: "edit", idKey: "employeeId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "employeeId",
      table: "employee",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Employee Report"
        navigate="/employee" // 👈 form route for add/edit
        tableHeaderColumns={reportColumns}
        data={residentData}
      />
    </div>
  );
}
