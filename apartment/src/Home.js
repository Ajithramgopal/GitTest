import React, { useContext } from "react";
import {  UserContext } from "./Context/UserContext";
export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Welcome All</h1>
      <h1>Welcome {user ? user.userName : "Guest"} 👋</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
