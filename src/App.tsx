import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
      <Box
        className="PageBody"
        overflow={"hidden"}
        display="flex"
        flexDirection={"column"}
        w="full"
        h={"100vh"}
      >
        <Box
          className="containerNew"
          display={"flex"}
          flex="1"
          overflow={"hidden"}
          w="100vw"
        >
          {/* add sidebar component Here*/}
          <Box
            className="otherSection"
            display={"flex"}
            flex="1"
            overflowY={"auto"}
          >
            <Routes>
              {/* add different routes that need to be loade for different pages */}
              <Route path="dashboard/*" element={<DashBoard />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/"  element={<Signin />} />
            </Routes>
          </Box>
        </Box>
      </Box>
  );
}

export default App;
