import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function FacilityBookingReport() {
  const { data: bookingData = [] } = useApi("facilityBook"); // 👈 API endpoint

  const reportColumns = [
    { header: "Resident ID", accessor: "residentId" },
    { header: "Facility ID", accessor: "facilityId" },
    { header: "Booking Date", accessor: "bookingDate" },
    { header: "Payment Status", accessor: "paymentStatus" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "facilityBookId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "facilityBookId",
      table: "facility",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Facility Booking Report"
        navigate="/facilitybook" // 👈 form route
        tableHeaderColumns={reportColumns}
        data={bookingData}
      />
    </div>
  );
}
