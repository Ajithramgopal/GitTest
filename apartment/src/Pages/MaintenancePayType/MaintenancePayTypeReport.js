import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function MaintenancePayTypeReport() {
  const { data: payTypeData = [] } = useApi("maintenancepay");

  const reportColumns = [
    { header: "Flat Type", accessor: "flatType" },
    { header: "Sqft", accessor: "sqft" },
    { header: "Amount", accessor: "amount" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },
    { header: "Edit", type: "edit", idKey: "typeId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "typeId",
      table: "maintenancepay",
    },
  ];

  return (
    <div>
      <ReportTable
        headerName="Maintenance Pay Type Report"
        navigate="/maintenancepay" // form route for create/edit
        tableHeaderColumns={reportColumns}
        data={payTypeData}
      />
    </div>
  );
}
