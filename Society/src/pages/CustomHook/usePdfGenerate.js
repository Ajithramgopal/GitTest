import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function usePdfGenerate({ columns = [], rows = [] }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("User Report", 14, 15);

    const tableColumn = columns.map((col) => col.header);
    const tableRows = rows.map((row) =>
      columns.map((col) => row?.[col.accessor] || "")
    );

    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
    });

    doc.save("User_Report.pdf");
  };

  return { generatePDF };
}
