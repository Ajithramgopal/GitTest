import React from "react";
import useApi from "./useApi";

export default function FetchName({ type, id, check }) {
  /**
   * type: 'resident' | 'block' | 'flat' | 'category'
   * id: residentId | blockId | flatId | catId
   * check: 'form' | 'report'
   */
  const { data: dataList = [] } = useApi(type); // fetch data from API

  // Find the matching item safely
  const item = dataList.find((i) => {
    if (type === "resident") return i.residentId === id;
    if (type === "block") return i.blockId === id;
    if (type === "flat") return i.flatId === id;
    if (type === "category") return i.catId === id;
    if (type === "visitorpurpose") return i.purposeId === id;
    return false;
  });

  // Decide what name to show
  let name = "N/A";
  if (item) {
    if (type === "resident") name = item.name;
    if (type === "block") name = item.blockName;
    if (type === "flat") name = item.flatName;
    if (type === "category") name = item.name;
    if (type === "visitorpurpose") name = item.purpose;
  }

  // ✅ Conditional rendering based on "check"
  return check === "report" ? (
    <span>{name}</span>
  ) : (
    <input type="text" value={name} readOnly />
  );
}
