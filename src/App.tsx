import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      {/* add different routes that need to be loade for different pages */}
      <Route path="dashboard/*" element={<DashBoard />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="/" element={<Signin />} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}

export default App;
