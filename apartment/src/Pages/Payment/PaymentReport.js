import React from "react";
import useApi from "../../Component/useApi";
import ReportTable from "../ReportTable";
import "../../Css/Report.css";

export default function PaymentReport() {
  const { data: paymentsData = [] } = useApi("payment");

  const reportColumns = [
    { header: "Resident ID", accessor: "residentId" },
    { header: "Due ID", accessor: "dueId" },
    { header: "Amount", accessor: "amount" },
    { header: "Payment Method", accessor: "paymentMethod" },
    { header: "Status", accessor: "status" },
    { header: "Paid At", accessor: "paidAt" },
    { header: "Created By", accessor: "createdBy" },
    { header: "Created Date", accessor: "createdDate" },
    { header: "Edit", type: "edit", idKey: "paymentId" },
    { header: "Delete", type: "delete", idKey: "paymentId", table: "payment" },
  ];

  return (
    <div>
      <ReportTable
        headerName="Payments Report"
        navigate="/payment" // 👈 form route
        tableHeaderColumns={reportColumns}
        data={paymentsData}
      />
    </div>
  );
}
