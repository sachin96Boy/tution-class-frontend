// src/components/AuthRoute.jsx
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = () => {
  const { token, userInfo } = useSelector((state: RootState) => state.auth);
  return token && userInfo != null ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default AuthRoute;
