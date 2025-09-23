import React, { useState } from "react";
import axios from "axios";

// 1. Interface for User Data
interface UserData {
  userid: string;
  username: string;
  password: string;
  conpassword: string;
  email: string;
  mobile: string;
  role: string;
  block: string;
  flat: string;
  createdby: string;
  createddate: string;
  updatedby: string;
  updateddate: string;
  organizationid: string;
}

export default function YTUser() {
  // 2. Use state with types
  const [userData, setUserData] = useState<UserData>({
    userid: "",
    username: "",
    password: "",
    conpassword: "",
    email: "",
    mobile: "",
    role: "",
    block: "",
    flat: "",
    createdby: "",
    createddate: "",
    updatedby: "",
    updateddate: "",
    organizationid: "",
  });

  const [det, setDet] = useState<UserData[]>([]); // array of user objects
  const [err, setErr] = useState<string>(""); // error is string

  // 3. Type-safe handleChange
  const handleChange = (key: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErr(""); // clear error when typing
  };

  // 4. Handle Submit with type
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Validation
    if (!userData.username) {
      setErr("Username must have some value");
      return;
    }
    if (!userData.password) {
      setErr("Password must have some value");
      return;
    }

    // Save locally
    setDet((prev) => [...prev, userData]);

    try {
      const response = await axios.post<UserData>(
        "http://localhost:5000/api/users",
        userData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("username", e.target.value)
          }
        />
        {err && <p style={{ color: "red" }}>{err}</p>}

        <label>password</label>
        <input
          type="text"
          name="password"
          value={userData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("password", e.target.value)
          }
        />
        {err && <p style={{ color: "red" }}>{err}</p>}

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
