import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function UserReport() {
  const { data: usersData = [] } = useApi("users");

  const reportColumns = [
    { header: "User Name", accessor: "userName" },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Edit", type: "edit", idKey: "userId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "userId",
      table: "users",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="User Report"
        navigate="/user"
        tableHeaderColumns={reportColumns}
        data={usersData}
      />
    </div>
  );
}
