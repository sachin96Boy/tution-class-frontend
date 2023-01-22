import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <Routes>
      {/* add different routes that need to be loade for different pages */}
      <Route path="dashboard/*" element={<DashBoard />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
    </Routes>
  );
}

export default App;
