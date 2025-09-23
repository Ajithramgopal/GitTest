import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function FlatReport() {
  const { data: flatData = [] } = useApi("flat"); // 👈 API endpoint for flat

  const reportColumns = [
    { header: "Block Name", accessor: "blockName" },
    { header: "Flat No", accessor: "flatNo" },
    { header: "Flat Name", accessor: "flatName" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "flatId" },
    { header: "Delete", type: "delete", idKey: "flatId", table: "flat" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Flat Report"
        navigate="/flat" // 👈 form route for add/edit
        tableHeaderColumns={reportColumns}
        data={flatData}
      />
    </div>
  );
}
