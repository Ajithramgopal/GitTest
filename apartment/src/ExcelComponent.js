import { useState } from "react";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "./Component/useApi";
import ExportExcel from "./ExportExcel";

export default function ExcelComponent({ tableName = "block" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { postData } = useApi(tableName);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      setData(parsedData);
      console.log("✅ Parsed Excel Data:", parsedData);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.length === 0) {
      toast.warn("Please upload an Excel file first!");
      return;
    }

    try {
      setLoading(true);
      await postData(data, "bulk");
      toast.success("Excel File Uploaded Successfully!");
      setData([]);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      toast.error("Failed to upload Excel data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Excel Upload</h3>
      <label>Upload Excel: </label>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <br />
      <br />

      {data.length > 0 && (
        <>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </button>

          {/* ✅ Pass data properly to ExportExcel */}
          <ExportExcel data={data} />

          <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((key) => (
                    <td key={key}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
