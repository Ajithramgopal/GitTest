import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcel() {
  const data = [
    { userid: 1, username: "Admin", email: "admin@example.com" },
    { userid: 2, username: "Ajithram", email: "ajith@example.com" },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data); // JSON → Sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "UserData.xlsx");
  };

  return <button onClick={exportToExcel}>Download Excel</button>;
}
