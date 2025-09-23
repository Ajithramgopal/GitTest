import { useEffect, useState, useContext } from "react";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePostApi from "../pages/CustomHook/usePostApi";
import ExcelPara from "./ExcelPara";
import "./ExcelUpload.css";
import { dataContext } from "../App";
export default function ExcelUpload({ table_name = "flat" }) {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  const toDate = data?.[0]?.formatted || null;
  const created = data?.[0]?.createdBy || "admin";
  const userId = data?.[0]?.userId;

  const [selectedTable, setSelectedTable] = useState(
    table_name.charAt(0).toUpperCase() + table_name.slice(1)
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const [validData, setValidData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);
  const [invalidCount, setInvalidCount] = useState(0);
  const { postData, postLoading } = usePostApi('flat');

  const parseExcelFile = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const expectedColumns = ExcelPara(selectedTable); // 🔥 get array
      const actualColumns = Object.keys(parsedData[0] || {});
      const missingColumns = expectedColumns.filter(
        (col) => !actualColumns.includes(col)
      );

      if (missingColumns.length > 0) {
        toast.error(`❌ Missing column(s): ${missingColumns.join(", ")}`);
        setValidData([]);
        setInvalidData([]);
        setInvalidCount(0);
        return;
      }

      const validRows = [];
      const errorRows = [];
      let errorCount = 0;

      parsedData.forEach((row) => {
        const isValid = expectedColumns.every(
          (col) => row[col] !== undefined && row[col] !== ""
        );
        if (isValid) {
          validRows.push(row);
        } else {
          errorRows.push(row);
          errorCount++;
        }
      });

      setValidData(validRows);
      console.log("test", validRows);
      setInvalidData(errorRows);
      setInvalidCount(errorCount);
    };
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    if (file) {
      parseExcelFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validData.length === 0) {
      toast.warn("No valid rows to upload!");
      return;
    }
    console.log(selectedTable.toLowerCase(), validData);
    await postData(selectedTable.toLowerCase(), validData); // 🔥 dynamic table name
    toast.success("✅ Excel File Uploaded Successfully!");
    setValidData([]);
    setInvalidCount(0);
    setInvalidData([]);
  };

  useEffect(() => {
    if (uploadedFile) {
      parseExcelFile(uploadedFile); // re-validate when table changes
    }
  }, [selectedTable]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Excel Upload</h3>

      <label>Select Table: </label>
      <select
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        <option value="Block">Block</option>
        <option value="Flat">Flat</option>
      </select>

      <br />
      <br />

      <label>Upload Excel: </label>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <br />
      <br />

      {validData.length > 0 || invalidCount > 0 ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button
              onClick={handleSubmit}
              disabled={postLoading || validData.length === 0}
            >
              {postLoading ? "Uploading..." : "Submit"}
            </button>

            <div className="badge green">{validData.length}</div>
            <div className="badge red">{invalidCount}</div>
            <span style={{ fontSize: "14px", color: "#555" }}>
              rows ready to upload
            </span>
          </div>

          {validData.length > 0 && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  {Object.keys(validData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {validData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{rowIndex + 1}</td>
                    {Object.keys(row).map((key) => (
                      <td key={key}>{row[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : null}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
