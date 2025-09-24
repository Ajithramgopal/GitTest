// FetchResident.js
import React from "react";
import useApi from "./useApi";

export default function FetchResident({ residentId }) {
  const { data: residents = [] } = useApi("resident"); // fetch residents

  // ✅ Find the resident safely
  const resident = residents.find((r) => r.residentId === residentId);

  const residentName = resident ? resident.name : "N/A";

  return <input type="text" value={residentName} readOnly />;
}
