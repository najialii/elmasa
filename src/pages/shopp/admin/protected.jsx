import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/authcontext";

const ProtectedRoute = ({ roles }) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (token && !token.includes(token)) {
    return <Navigate to="/checkout" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
