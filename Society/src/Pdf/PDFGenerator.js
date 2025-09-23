import React from "react";
import jsPDF from "jspdf";

export default function PDFGenerator() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Hello, Ajithram!", 10, 10);
    doc.save("example.pdf");
  };

  return (
    <div>
      <h2>PDF Generator</h2>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
}
