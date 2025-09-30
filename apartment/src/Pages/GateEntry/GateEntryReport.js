import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function GateEntryReport() {
  const { data: gateEntryData = [] } = useApi("visitor");

  const reportColumns = [
    { header: "Resident ID", accessor: "residentId" },
    { header: "Name", accessor: "name" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Vehicle No", accessor: "vehicleNo" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "visitId" },
    { header: "Delete", type: "delete", idKey: "visitId", table: "gateentry" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Gate Entry Report"
        navigate="/gateentry"
        tableHeaderColumns={reportColumns}
        data={gateEntryData}
      />
    </div>
  );
}
