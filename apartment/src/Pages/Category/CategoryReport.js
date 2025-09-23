import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function CategoryReport() {
  const { data: categoryData = [] } = useApi("category");

  const reportColumns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "catId" },
    { header: "Delete", type: "delete", idKey: "catId", table: "category" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Category Report"
        navigate="/category" // 👈 creation/edit form route
        tableHeaderColumns={reportColumns}
        data={categoryData}
      />
    </div>
  );
}
