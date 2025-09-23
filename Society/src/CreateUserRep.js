import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUserRep() {
  const [userData, setUserData] = useState([]);
  const [filt, setFilt] = useState({ search: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => setUserData(response.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔎 Filtered data
  const filteredUsers = userData.filter((item) =>
    item.userName?.toLowerCase().includes(filt.search.toLowerCase())
  );

  const handleChange = (key, value) => {
    setFilt((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDel = (userId) => {
    console.log("id:", userId);

    if (window.confirm("Do you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/users/${userId}`)
        .then((response) => {
          console.log("Deleted successfully:", response.data);
          // you can also update state here to remove the user from UI
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };
  const handleEdit = (item) => {
    console.log("item", item);
    navigate("/cre", { state: item });
  };

  return (
    <>
      <input
        type="search"
        placeholder="Search by user name"
        value={filt.search}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      <h1>User Report</h1>

      {/* 🔹 Filtered Table */}
      <h3>Filtered Users</h3>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Block</th>
            <th>Flat</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.userId}</td>
                <td>{item.userName}</td>
                <td>{item.mobile}</td>
                <td>{item.email}</td>
                <td>{item.block}</td>
                <td>{item.flat}</td>
                <td>
                  <button onClick={() => handleDel(item.userId)}>Del</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No matching users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
