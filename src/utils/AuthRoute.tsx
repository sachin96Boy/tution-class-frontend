// src/components/AuthRoute.jsx
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = () => {
  const { token, userInfo, coporateInfo } = useSelector(
    (state: RootState) => state.auth
  );
  return token ? (
    <Navigate
      to={userInfo ? "/dashboard" : coporateInfo ? "/admin" : "/"}
      replace
    />
  ) : (
    <Outlet />
  );
};

export default AuthRoute;
