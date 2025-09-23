// ExcelPara.js
export default function ExcelPara(parameter) {
  switch (parameter.toLowerCase()) {
    case "block":
      return ["blockid", "blockname", "flatcount", "desc"];
    case "flat":
      return [
        "flatId",
        "blockName",
        "flatNo",
        "flatName",
        "ownerName",
        "mobile",
      ];
    default:
      return [];
  }
}
