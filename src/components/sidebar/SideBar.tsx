import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function SideBar() {
  const [dashboard, setDashboard] = useState(false);
  const [mycourse, setMyCourse] = useState(false);
  const [support, setSupport] = useState(false);
  const [myAccount, setMyAccount] = useState(false);
  const [logOut, setLogout] = useState(false);
  return (
    <Box bg={"white"} h="calc(100vh-100px)">
      <Flex direction={"column"} gap={5}>
        <Box
          className="profileViwer"
          bg={"#E6F1FF"}
          rounded="2xl"
          border="20px"
          ml={10}
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
          h={"full"}
        >
          <Flex
            align={"start"}
            gap={5}
            justify="center"
            flexDirection={"column"}
            ml={16}
            my={5}
          >
            <Flex
              align={"center"}
              justify="center"
              color="white"
              _hover={{
                color: "#F4BB4E",
                cursor: "pointer",
                fontcolor: "#F4BB4E",
              }}
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
              }}
            >
              <MdDashboard />
              <Text
                color={"white"}
                ml={2}
                fontFamily={"body"}
                fontSize="18px"
                fontWeight={"600"}
                _hover={{ color: "#F4BB4E" }}
              >
                Dashboard
              </Text>
            </Flex>
            <Flex
              align={"center"}
              justify="center"
              color="white"
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
              }}
            >
              <GiBookshelf />
              <Text
                color={"white"}
                ml={2}
                fontFamily={"body"}
                fontSize="18px"
                fontWeight={"600"}
                _hover={{ color: "#F4BB4E" }}
              >
                My Courses
              </Text>
            </Flex>
            <Flex
              align={"center"}
              justify="center"
              color="white"
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
              }}
            >
              <BsHeadset />
              <Text
                color={"white"}
                ml={2}
                fontFamily={"body"}
                fontSize="18px"
                fontWeight={"600"}
                _hover={{ color: "#F4BB4E" }}
              >
                Support
              </Text>
            </Flex>
            <Flex
              align={"center"}
              justify="center"
              color="white"
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
              }}
            >
              <FaUser />
              <Text
                color={"white"}
                ml={2}
                fontFamily={"body"}
                fontSize="18px"
                fontWeight={"600"}
                _hover={{ color: "#F4BB4E" }}
              >
                My Account
              </Text>
            </Flex>
            <Flex
              align={"center"}
              justify="center"
              color="white"
              _hover={{
                color: "#F4BB4E",
                cursor: "pointer",
                fontcolor: "#F4BB4E",
              }}
              bg={
                logOut ? "linear-gradient(90deg, #0776FF 0%, #225498 100%)" : ""
              }
              onClick={() => {
                setLogout(!logOut);
                setDashboard(false);
                setMyCourse(false);
                setSupport(false);
                setMyAccount(false);
              }}
            >
              <FiLogOut />
              <Text
                color={"white"}
                ml={2}
                fontFamily={"body"}
                fontSize="18px"
                fontWeight={"600"}
                _hover={{ color: "#F4BB4E" }}
              >
                Logout
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default SideBar;
