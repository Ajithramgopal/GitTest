import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function FacilityReport() {
  const { data: facilityData = [] } = useApi("facilitymas"); // 👈 API endpoint
  // console.log("facilityData", facilityData);
  const reportColumns = [
    { header: "Facility Name", accessor: "name" },
    { header: "Available Slot", accessor: "availableslot" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "facilityMasId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "facilityMasId",
      table: "facilitymas",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Facility Report"
        navigate="/facility" // 👈 form route
        tableHeaderColumns={reportColumns}
        data={facilityData}
      />
    </div>
  );
}
