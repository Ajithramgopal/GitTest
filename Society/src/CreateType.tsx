import axios from "axios";
import React, { useState, useEffect } from "react";

interface OrgData {
  orgId?: number; // Let the backend handle this if it's auto-incremented
  orgName: string;
  status?: string;
  // startDate?: Date;
  // endDate?: Date;
  // userId?: number;
  // createdBy?: string;
  // createdDate?: Date;
  // updatedBy?: string;
  // updatedDate?: Date;
}

export default function CreateType() {
  const [orgData, setOrgData] = useState<OrgData>({
    orgName: "",
    status: "",
    // startDate: new Date(),
    // endDate: new Date(),
    // userId: 1000,
    // createdBy: "",
    // createdDate: new Date(),
    // updatedBy: "",
    // updatedDate: new Date(),
  });
  const [allData, setAllData] = useState<OrgData[]>([]);
  let err: any = {};
  const handleChange = (key: keyof OrgData, value: string | number) => {
    setOrgData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!orgData.orgName) {
    err.orgName = "must sdx";
  }
  console.log("err", err);
  const fetchAllData = () => {
    axios
      .get("http://localhost:5000/api/org")
      .then((response) => setAllData(response.data))
      .catch((err) => console.error("Error fetching orgs:", err));
  };

  useEffect(() => {
    fetchAllData(); // Fetch on component mount
  }, []);
  console.log("fetchAllData", fetchAllData);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orgData.orgName.trim()) {
      alert("OrgName is required");
      return;
    }
    console.log("orgData", orgData);
    axios
      .post("http://localhost:5000/api/org", orgData)
      .then((response) => {
        console.log("Created:", response.data);
        // fetchAllData(); // Refresh the list after creation
        // setOrgData({
        //   orgName: "",
        //   status: "",
        //   startDate: "",
        //   endDate: "",
        //   userId: undefined,
        //   createdBy: "",
        //   createdDate: "",
        //   updatedBy: "",
        //   updatedDate: "",
        // }); // Reset form
      })
      .catch((err) => console.error("Error creating org:", err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>OrgName</label>
        <input
          type="text"
          name="orgName"
          value={orgData.orgName}
          onChange={(e) => handleChange("orgName", e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>All Data (fetched from backend)</h2>
      <ul>
        {allData.map((item, index) => (
          <li key={item.orgId || index}>{item.orgName}</li>
        ))}
      </ul>
    </>
  );
}
