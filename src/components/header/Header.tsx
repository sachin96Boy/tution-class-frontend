import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Avatar,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Logo from "../Logo";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logout } from "@/features/auth/authSlice";
import { CircleX, Headset, LayoutDashboard, LibraryBig, LogOut, Menu, User, UserRound } from "lucide-react";

function Header() {
  const { open, onToggle } = useDisclosure(); // Handles mobile menu state
  const dispatch = useDispatch<AppDispatch>();
  let location = useLocation();
  const navigate = useNavigate();

  const checkActive = (route: string) => {
    return location.pathname === route ? "active" : "";
  };

  const { token, userInfo } = useSelector((state: RootState) => state.auth);

  const NameArray = userInfo?.full_name?.trim().split(" ") ?? ["", ""];

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size="28px" />,
      path: "/dashboard",
      label: "Dashboard",
      key: "dashboard",
    },
    {
      icon: <LibraryBig size="28px" />,
      label: "My Courses",
      path: "/dashboard/myCourses",
      key: "myCourses",
    },
    {
      icon: <Headset size="28px" />,
      path: "/dashboard/support",
      label: "Support",
      key: "support",
    },
    {
      icon: <User size="28px" />,
      path: "/dashboard/myAccount",
      label: "My Account",
      key: "myAccount",
    },
  ];

  const renderMobileMenu = () => (
    <Box
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={1000}
      overflowY="auto"
      bg={"gray.50"}
    >
      <Flex m={5} align="center" justify="space-between">
        <Icon
          as={CircleX}
          boxSize="25"
          color="red.400"
          onClick={onToggle}
          cursor="pointer"
        />
        <Button
          bgGradient="linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
          color="white"
          boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
          onClick={() => navigate("/dashboard/teacherList")}
        >
          <Text fontSize={["16px", "16px", "21px"]} fontWeight="400">
            Teachers List
          </Text>
        </Button>
      </Flex>
      <Flex
        direction="column"
        align="center"
        justify="space-between"
        overflowY={"auto"}
        gap={5}
      >
        <Box bg="#E6F1FF" rounded="2xl" p={4} mx={4}>
          <Flex align="center" gap={2}>
            <Avatar.Root size="lg">
              <Avatar.Fallback>
                <Avatar.Icon>
                  <UserRound  size={"28"} style={{ color: "#ffffffff" }} />
                </Avatar.Icon>
              </Avatar.Fallback>
              <Avatar.Image src={userInfo?.AdditionalStudentDatum.profile_image} />
            </Avatar.Root>
            <Flex direction="column">
              <Text color="#215DA7" fontSize="15px" fontWeight="bold">
                {NameArray?.[0]}
              </Text>
              <Text color="#636363" fontSize="15px">
                {NameArray?.[1]}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          bg="linear-gradient(94.5deg, #313C6A 0.53%, #205EAA 99.79%)"
          w="100%"
          flex={1}
          borderTopRadius="75px"
          p={5}
        >
          <Flex direction="column" justify="space-between" h={"full"}>
            <Flex direction="column" gap={5}>
              {menuItems.map((item, index) => (
                <NavLink key={index} to={item.path}>
                  {checkActive(item.path) === "active" ? (
                    <Flex
                      key={item.key}
                      align="center"
                      color="white"
                      p={3}
                      borderRadius="12px"
                      _hover={{ color: "#F4BB4E", cursor: "pointer" }}
                      bg={"linear-gradient(90deg, #0776FF 0%, #225498 100%)"}
                    >
                      {item.icon}
                      <Text ml={2} fontSize="18px" fontWeight="600">
                        {item.label}
                      </Text>
                    </Flex>
                  ) : (
                    <Flex
                      key={item.key}
                      align="center"
                      color="white"
                      p={3}
                      borderRadius="12px"
                      _hover={{ color: "#F4BB4E", cursor: "pointer" }}
                    >
                      {item.icon}
                      <Text ml={2} fontSize="18px" fontWeight="600">
                        {item.label}
                      </Text>
                    </Flex>
                  )}
                </NavLink>
              ))}
            </Flex>
            <Spacer />
            <Flex justify="center" p={3}>
              <Flex
                align="center"
                color="white"
                p={3}
                borderRadius="12px"
                _hover={{ color: "#F4BB4E", cursor: "pointer" }}
                onClick={handleLogout}
              >
                <LogOut size="28px" />
                <Text ml={2} fontSize="18px" fontWeight="600">
                  Logout
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );

  return (
    <Box bg={"gray.50"} as="header" position="sticky" top={0} zIndex={1000}>
      <Flex
        mx={5}
        align="center"
        justify={
          token ? "space-between" : ["center", "center", "space-between"]
        }
      >
        {token ? (
          <Icon
            as={Menu}
            boxSize="25"
            color="blue.400"
            onClick={onToggle}
            display={["block", "block", "none"]}
            cursor="pointer"
          />
        ) : null}

        <Logo boxSize="24" linkPath="/" fitType="cover" />
        <Button
          bgGradient="linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
          color="white"
          boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
          onClick={() => navigate("/dashboard/teacherList")}
          display={["none", "none", "block"]}
        >
          <Text fontSize="21px" fontWeight="400">
            Teachers List
          </Text>
        </Button>
      </Flex>
      {open && renderMobileMenu()}
    </Box>
  );
}

export default Header;
