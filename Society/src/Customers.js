import React, { useState, useEffect } from "react";
import axios from "axios";

function Customers() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [customers, setCustomers] = useState([]);

  // Fetch customers when component loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
      });
  }, []);

  // Add new customer
  const addCustomer = () => {
    if (!name || !address) {
      alert("Please enter both name and address");
      return;
    }

    axios
      .post("http://localhost:5000/api/customers", { name, address })
      .then((res) => {
        alert(res.data.message);
        setCustomers([...customers, { id: res.data.id, name, address }]);
        setName("");
        setAddress("");
      })
      .catch((err) => {
        console.error("Error adding customer:", err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Form</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addCustomer}>Add Customer</button>

      <h2 style={{ marginTop: "20px" }}>Customer List</h2>
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> - {c.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;
