import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../Logo";

function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [mycourse, setMyCourse] = useState(false);
  const [support, setSupport] = useState(false);
  const [myAccount, setMyAccount] = useState(false);
  const [logOut, setLogout] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  let headerNav = (
    <>
      <Flex
        mx={5}
        align={"center"}
        justify={"space-between"}
        display={["flex", "flex", "none"]}
        position="relative"
      >
        <Icon
          as={GiHamburgerMenu}
          boxSize="25"
          color={"blue.400"}
          onClick={handleShow}
        />
        <Logo boxSize={"24"} linkPath={"/dashboard"} fitType={"Cover"}/>
      </Flex>
      <Flex
        display={["none", "none", "flex"]}
        align={"center"}
        justify="space-between"
        mx={10}
        as="nav"
      >
        <Logo boxSize={"100px"} linkPath={"/dashboard"} fitType={"Cover"}/>
        <Box className="Teacher-List">
          <Button
            border={"10px"}
            bgGradient="linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
            colorScheme={"yellow"}
            boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
            onClick={() => navigate("/dashboard/teacherList")}
          >
            <Text
              fontFamily={"body"}
              fontSize="21px"
              color="white"
              fontWeight={"400"}
            >
              Teachers List
            </Text>
          </Button>
        </Box>
      </Flex>
    </>
  );

  if (show) {
    headerNav = (
      <>
        <Flex
          m="5"
          align={"center"}
          justify={"space-between"}
          position="relative"
        >
          <Icon
            as={AiOutlineClose}
            boxSize="25"
            color={"red.400"}
            onClick={handleShow}
          />
          <Box className="Teacher-List">
            <Button
              border={"10px"}
              bgGradient="linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
              colorScheme={"yellow"}
              boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
              onClick={() => navigate("/dashboard/teacherList")}
            >
              <Text
                fontFamily={"body"}
                fontSize={["16px", "16px", "21px"]}
                color="white"
                fontWeight={"400"}
              >
                Teachers List
              </Text>
            </Button>
          </Box>
        </Flex>
        <Flex
          direction={"column"}
          align="center"
          justifyContent="space-between"
          gap={5}
          overflowY="auto"
        >
          <Box
            className="profileViwer"
            bg={"#E6F1FF"}
            rounded="2xl"
            border="20px"
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
            borderTopLeftRadius={"75px"}
            bg="linear-gradient(94.5deg, #313C6A 0.53%, #205EAA 99.79%)"
            w={"100%"}
            h="100vh"
          >
            <Flex
              align={"start"}
              gap={5}
              justify="space-between"
              flexDirection={"column"}
              ml={8}
              my={5}
            >
              <Flex
                direction={"column"}
                justify="center"
                align={"start"}
                gap={5}
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
                  <MdDashboard size={"28px"} />
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
                    navigate("/dashboard/myCourses");
                  }}
                >
                  <GiBookshelf size={"28px"} />
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
                    navigate("/dashboard/support");
                  }}
                >
                  <BsHeadset size={"28px"} />
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
                    navigate("/dashboard/myAccount");
                  }}
                >
                  <FaUser size={"28px"} />
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
              <Flex direction={"column"} justify="center" align={"start"}>
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
                  <FiLogOut size={"28px"} />
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
      </>
    );
  }

  return (
    <Box
      backgroundColor={"white"}
      as="header"
      top="0"
      position={"sticky"}
      w={show ? "100vw" : "full"}
      h={show ? "full" : "100px"}
      display={"block"}
    >
      {headerNav}
    </Box>
  );
}

export default Header;
