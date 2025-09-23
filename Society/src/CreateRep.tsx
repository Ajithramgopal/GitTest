import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface User {
  userId: number;
  userName: string;
  status: string;
  email: string;
}

export default function CreateRep() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchField, setSearchField] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<User[]> = await axios.get(
          "http://localhost:5000/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (item: User) => {
    console.log("Edit:", item);
  };

  const handleDel = (id: number) => {
    console.log("Delete ID:", id);
  };

  // ✅ Filter logic (case-insensitive contains search)
  const filtered = users.filter((user) =>
    user.userName.toLowerCase().includes(searchField.toLowerCase())
  );

  // ✅ Simplified handleSearch
  const handleSearch = (value: string) => {
    setSearchField(value);
  };

  return (
    <>
      <h1>TypeScript Report</h1>
      <input
        type="search"
        value={searchField}
        name="search"
        placeholder="Search by name..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={index}>
              <td>{item.userId}</td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDel(item.userId)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
