import { Box } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import MyCourses from "./pages/MyCourses";
import Signin from "./pages/Signin";

function App() {
  return (
    <Router>
      <Box
        className="PageBody"
        overflow={"hidden"}
        display="flex"
        flexDirection={"column"}
        w="full"
        h={"100vh"}
      >
        <Header />
        <Box
          className="containerNew"
          display={"flex"}
          flex="1"
          overflow={"hidden"}
          w="100vw"
        >
          {/* add sidebar component Here*/}
          <SideBar />
          <Box
            className="otherSection"
            display={"flex"}
            flex="1"
            overflowY={"auto"}
          >
            <Routes>
              {/* add different routes that need to be loade for different pages */}
              <Route path="/" element={<Signin />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/myCourses" element={<MyCourses />} />
              <Route path="/myAccount" element={<MyAccount />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
