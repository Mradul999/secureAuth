import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = sessionStorage.getItem("user");
  if (!user) {
    console.log("User not authorized yet");
    return <Navigate to="/login" />;
  }
  return children;
}
