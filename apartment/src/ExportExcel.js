import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcel({ data }) {
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert("No data available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data); // JSON → Sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "UserData.xlsx");
  };

  return <button onClick={exportToExcel}>⬇ Download Excel</button>;
}
