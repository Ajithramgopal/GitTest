import axios from "axios";
import { useEffect, useState } from "react";

export default function FormingShow() {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  //🔍 Filter the data based on search term
  const filteredData = tableData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>User Report</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by title or body"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optional: Show count */}
      <p>{filteredData.length} results found</p>
    </div>
  );
}
