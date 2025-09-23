import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/dashboard" replace />; // ✅ redirect to Login
  }

  return <>{children}</>;
}
