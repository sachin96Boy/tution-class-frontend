import { Box } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import MyCourses from "./pages/MyCourses";
import Signin from "./pages/Signin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import Signup from "./pages/Signup";

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  console.log(analytics);
  console.log(auth);

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
              <Route path="/signup" element={<Signup />} />
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
