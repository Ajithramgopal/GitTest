import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function AnnouncementReport() {
  const { data: announcementData = [] } = useApi("announce"); // 👈 API endpoint
  console.log("data", announcementData);
  const reportColumns = [
    { header: "Title", accessor: "title" },
    { header: "Message", accessor: "message" },
    { header: "Posted By", accessor: "postedBy" },
    { header: "Created By", accessor: "createdby" },
    { header: "Created Date", accessor: "createddate" },
    { header: "Updated By", accessor: "updatedby" },
    { header: "Updated Date", accessor: "updateddate" },
    { header: "Edit", type: "edit", idKey: "announceId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "announceId",
      table: "announce",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Announcement Report"
        navigate="/announce" // 👈 form route
        tableHeaderColumns={reportColumns}
        data={announcementData}
      />
    </div>
  );
}
