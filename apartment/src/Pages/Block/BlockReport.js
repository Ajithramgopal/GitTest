import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function BlockReport() {
  const { data: blocksData = [] } = useApi("block"); // 👈 API endpoint for block

  const reportColumns = [
    { header: "Block Name", accessor: "blockName" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "blockId" },
    { header: "Delete", type: "delete", idKey: "blockId", table: "block" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Block Report"
        navigate="/block" // 👈 form route for create/edit
        tableHeaderColumns={reportColumns}
        data={blocksData}
      />
    </div>
  );
}
