import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ReportData() {
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const data = location.state?.userData;
  console.log("From location:", data);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setUserData(response.data);
        setFilteredData(response.data); // show all initially
      })
      .catch((error) => console.log(error));
  }, []);

  // 👇 Debounced search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchFilter.trim() === "") {
        setFilteredData(userData);
      } else {
        const filterData = userData.filter((item) =>
          item.userName
            ?.trim()
            .toLowerCase()
            .includes(searchFilter.trim().toLowerCase())
        );
        setFilteredData(filterData);
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler); // cleanup on change
    };
  }, [searchFilter, userData]);

  return (
    <>
      <h1>Report</h1>
      <input
        type="search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Search by username..."
      />
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Status</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.userName}</td>
              <td>{item.status}</td>
              <td>{item.role}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
