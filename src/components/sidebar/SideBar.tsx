import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar() {
  const [dashboard, setDashboard] = useState(false);
  const [mycourse, setMyCourse] = useState(false);
  const [support, setSupport] = useState(false);
  const [myAccount, setMyAccount] = useState(false);
  const [logOut, setLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      bg={"white"}
      h="calc(100vh-100px)"
      display={location.pathname === "/"|| location.pathname === "/signup" ? "none" : "block"}
    >
      <Flex direction={"column"} align='start' justifyContent="space-between" gap={5}>
        <Box
          className="profileViwer"
          bg={"#E6F1FF"}
          rounded="2xl"
          border="20px"
          ml={4}
        >
          <Flex align={"center"} justify="center" gap={2} mx={8} my={2}>
            <Box
              className="Avater-box"
              rounded={"full"}
              bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
              p={"4px"}
            >
              <Box rounded={"full"} bg={"#E6F1FF"} p={"2px"}>
                <Avatar />
              </Box>
            </Box>

            <Flex direction={"column"}>
              <Text
                fontFamily={"body"}
                color="#215DA7"
                fontSize={"15px"}
                fontWeight="bold"
              >
                Hashan
              </Text>
              <Text
                fontFamily={"body"}
                color="#636363"
                fontSize={"15px"}
                fontWeight="normal"
              >
                Maduranga
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          className="menu-section"
          borderTopRightRadius={"75px"}
          bg="linear-gradient(94.5deg, #313C6A 0.53%, #205EAA 99.79%)"
          w={"100%"}
          h={"100vh"}
          
        >
          <Flex
            align={"start"}
            gap={5}
            justify="space-between"
            flexDirection={"column"}
            ml={8}
            my={5}
          >
            <Flex direction={"column"} justify="center" align={"start"} gap={5}>
              <Flex
                align={"center"}
                justify="center"
                color="white"
                _hover={{
                  color: "#F4BB4E",
                  cursor: "pointer",
                  fontcolor: "#F4BB4E",
                }}
                p={5}
                borderRadius={"12px"}
                bg={
                  dashboard
                    ? "linear-gradient(90deg, #0776FF 0%, #225498 100%)"
                    : ""
                }
                onClick={() => {
                  setDashboard(!dashboard);
                  setMyCourse(false);
                  setSupport(false);
                  setMyAccount(false);
                  setLogout(false);
                  navigate("/dashboard");
                }}
              >
                <MdDashboard />
                <Text
                  ml={2}
                  fontFamily={"body"}
                  fontSize="18px"
                  fontWeight={"600"}
                >
                  Dashboard
                </Text>
              </Flex>
              <Flex
                align={"center"}
                justify="center"
                color="white"
                borderRadius={"12px"}
                p={5}
                _hover={{
                  color: "#F4BB4E",
                  cursor: "pointer",
                  fontcolor: "#F4BB4E",
                }}
                bg={
                  mycourse
                    ? "linear-gradient(90deg, #0776FF 0%, #225498 100%)"
                    : ""
                }
                onClick={() => {
                  setMyCourse(!mycourse);
                  setDashboard(false);
                  setSupport(false);
                  setMyAccount(false);
                  setLogout(false);
                  navigate("/myCourses");
                }}
              >
                <GiBookshelf />
                <Text
                  ml={2}
                  fontFamily={"body"}
                  fontSize="18px"
                  fontWeight={"600"}
                >
                  My Courses
                </Text>
              </Flex>
              <Flex
                align={"center"}
                justify="center"
                p={5}
                color="white"
                borderRadius={"12px"}
                _hover={{
                  color: "#F4BB4E",
                  cursor: "pointer",
                  fontcolor: "#F4BB4E",
                }}
                bg={
                  support
                    ? "linear-gradient(90deg, #0776FF 0%, #225498 100%)"
                    : ""
                }
                onClick={() => {
                  setSupport(!support);
                  setDashboard(false);
                  setMyCourse(false);
                  setMyAccount(false);
                  setLogout(false);
                  navigate("/support");
                }}
              >
                <BsHeadset />
                <Text
                  ml={2}
                  fontFamily={"body"}
                  fontSize="18px"
                  fontWeight={"600"}
                >
                  Support
                </Text>
              </Flex>
              <Flex
                align={"center"}
                justify="center"
                p={5}
                color="white"
                borderRadius={"12px"}
                _hover={{
                  color: "#F4BB4E",
                  cursor: "pointer",
                  fontcolor: "#F4BB4E",
                }}
                bg={
                  myAccount
                    ? "linear-gradient(90deg, #0776FF 0%, #225498 100%)"
                    : ""
                }
                onClick={() => {
                  setMyAccount(!myAccount);
                  setDashboard(false);
                  setMyCourse(false);
                  setSupport(false);
                  setLogout(false);
                  navigate("/myAccount");
                }}
              >
                <FaUser />
                <Text
                  ml={2}
                  fontFamily={"body"}
                  fontSize="18px"
                  fontWeight={"600"}
                >
                  My Account
                </Text>
              </Flex>
            </Flex>
            <Spacer />
            <Flex direction={"column"} justify="center" align={"start"} >
              <Flex
                align={"center"}
                justify="center"
                p={5}
                color="white"
                borderRadius={"12px"}
                _hover={{
                  color: "#F4BB4E",
                  cursor: "pointer",
                  fontcolor: "#F4BB4E",
                }}
                bg={
                  logOut
                    ? "linear-gradient(90deg, #0776FF 0%, #225498 100%)"
                    : ""
                }
                onClick={() => {
                  setLogout(!logOut);
                  setDashboard(false);
                  setMyCourse(false);
                  setSupport(false);
                  setMyAccount(false);
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
                <FiLogOut />
                <Text
                  ml={2}
                  fontFamily={"body"}
                  fontSize="18px"
                  fontWeight={"600"}
                >
                  Logout
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default SideBar;
