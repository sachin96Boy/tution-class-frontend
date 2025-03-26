// src/components/AuthRoute.jsx
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = () => {
  const { token, coporateInfo } = useSelector((state: RootState) => state.auth);
  return token && coporateInfo != null ? <Outlet/> : <Navigate to="/corporate" replace />;
};

export default AdminRoute;
