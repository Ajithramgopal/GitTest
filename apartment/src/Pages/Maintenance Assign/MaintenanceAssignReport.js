import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";
import FetchName from "../../Component/FetchName";

export default function MaintenanceAssignReport() {
  const { data: maintenanceData = [] } = useApi("maintenance"); // 👈 API endpoint for maintenance

  // const reportColumns = [
  //   { header: "Maintenance ID", accessor: "maintainId" },
  //   { header: "Resident ID", accessor: "residentId" },
  //   { header: "Block", accessor: "block" },
  //   { header: "Flat", accessor: "flat" },
  //   { header: "Category", accessor: "category" },
  //   { header: "Created By", accessor: "createdBy" },
  //   { header: "Created Date", accessor: "createdDate" },
  //   { header: "Updated By", accessor: "updatedBy" },
  //   { header: "Updated Date", accessor: "updatedDate" },

  //   { header: "Edit", type: "edit", idKey: "maintainId" },
  //   {
  //     header: "Delete",
  //     type: "delete",
  //     idKey: "maintainId",
  //     table: "maintenance",
  //   },
  // ];

  const reportColumns = [
    // { header: "Maintenance ID", accessor: "maintainId" },

    {
      header: "Resident",
      accessor: "residentId",
      render: (row) => (
        <FetchName type="resident" id={row.residentId} check="report" />
      ),
    },
    {
      header: "Block",
      accessor: "blockId",
      render: (row) => (
        <FetchName type="block" id={Number(row.block)} check="report" />
      ),
    },
    {
      header: "Flat",
      accessor: "flatId",
      render: (row) => (
        <FetchName type="flat" id={Number(row.flat)} check="report" />
      ),
    },
    {
      header: "Category",
      accessor: "category",
      render: (row) => (
        <FetchName type="category" id={Number(row.category)} check="report" />
      ),
    },

    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Updated By", accessor: "updatedBy" },
    { header: "Updated Date", accessor: "updatedDate" },

    { header: "Edit", type: "edit", idKey: "maintainId" },
    {
      header: "Delete",
      type: "delete",
      idKey: "maintainId",
      table: "maintenance",
    },
  ];
  return (
    <div>
      <ReportTable
        headerName="Maintenance Report"
        navigate="/maintenanceassign" // 👈 form route for create/edit
        tableHeaderColumns={reportColumns}
        data={maintenanceData}
      />
    </div>
  );
}
