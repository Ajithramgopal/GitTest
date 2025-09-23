// utils/downloadExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const downloadExcel = (
  data,
  fileName = "Data.xlsx",
  sheetName = "Sheet1"
) => {
  if (!data || data.length === 0) {
    alert("No data available to export!");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(file, fileName);
};
