import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function Scanner() {
  const [data, setData] = useState("Not Found");

  return (
    <div>
      <h2>QR / Barcode Scanner</h2>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
        }}
      />
      <p>Scanned Result: {data}</p>
    </div>
  );
}
