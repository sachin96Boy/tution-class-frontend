import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";
import AuthRoute from "./utils/AuthRoute";
import AdminSigninScreen from "./pages/admin/AdminSigninScreen";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";
import FrontViewPage from "./pages/front_view/FrontViewPage";

function App() {
  return (
    <Routes>
      {/* add different routes that need to be loade for different pages */}
      <Route path="dashboard/*" element={<DashBoard />} />
      <Route path="admin/*" element={<AdminRoutes />} />
      <Route element={<AuthRoute />}>
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="login" element={<Signin />} />
        <Route path="coparate" element={<AdminSigninScreen />} />
      </Route>
      <Route path="/" element={<FrontViewPage />} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}

export default App;
