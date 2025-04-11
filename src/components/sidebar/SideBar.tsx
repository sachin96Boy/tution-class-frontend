import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { Headset, LayoutDashboard, LibraryBig, LogOut, User, UserRound } from "lucide-react";

function SideBar() {
  const dispatch = useDispatch<AppDispatch>();
  let location = useLocation();

  const checkActive = (route: string) => {
    return location.pathname === route ? "active" : "";
  };

  const { token, userInfo } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const sideBarMenuList = [
    {
      icon: <LayoutDashboard size={"28px"} />,
      label: "Dashboard",
      path: "/dashboard",
      key: "dashboard",
    },
    {
      icon: <LibraryBig size={"28px"} />,
      label: "My Courses",
      path: "/dashboard/myCourses",
      key: "myCourses",
    },
    {
      icon: <Headset size={"28px"} />,
      label: "Support",
      path: "/dashboard/support",
      key: "support",
    },
    {
      icon: <User size={"28px"} />,
      label: "My Account",
      path: "/dashboard/myAccount",
      key: "myAccount",
    },
  ];

  const NameArray = userInfo?.full_name?.trim().split(" ") ?? ["", ""];

  const ProfileMenu = () => {
    return (
      <Box
        className="profileViwer"
        bg={"light_bg_card"}
        rounded="2xl"
        border="20px"
        ml={4}
        mb={4}
      >
        <Flex align={"center"} justify="center" gap={2} mx={8} my={2}>
          <Box
            className="Avater-box"
            rounded={"full"}
            bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            p={"4px"}
          >
            <Box rounded={"full"} bg={"#E6F1FF"} p={"2px"}>
              <Avatar.Root>
                <Avatar.Fallback>
                  <Avatar.Icon>
                    <UserRound size={"28"} style={{ color: "#ffffffff" }} />
                  </Avatar.Icon>
                </Avatar.Fallback>
              </Avatar.Root>
            </Box>
          </Box>

          <Flex
            flexDirection={"column"}
            alignItems={"start"}
            justifyContent={"center"}
            display={["none", "none", "none", "block"]}
          >
            <Text
              fontFamily={"body"}
              color="#215DA7"
              fontSize={"15px"}
              fontWeight="bold"
            >
              {NameArray?.[0]}
            </Text>
            <Text
              fontFamily={"body"}
              color="#636363"
              fontSize={"15px"}
              fontWeight="normal"
            >
              {NameArray?.[1]}
            </Text>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Box as="div" h="calc(100vh-100px)" display={["none", "none", "block"]}>
      <Flex
        direction={"column"}
        align="start"
        justifyContent="space-between"
        h="100%"
      >
        <ProfileMenu />

        <Box
          className="menu-section"
          borderTopRightRadius={"75px"}
          bg="linear-gradient(94.5deg, #313C6A 0.53%, #205EAA 99.79%)"
          w={"100%"}
          h={"100%"}
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex
            direction={"column"}
            justify="center"
            align={"start"}
            gap={5}
            ml={8}
            my={token ? 5 : 10}
          >
            {sideBarMenuList.map((item, index) => (
              <NavLink to={item.path} key={index}>
                {checkActive(item.path) === "active" ? (
                  <Flex
                    key={item.key}
                    align={"center"}
                    justify="center"
                    color="white"
                    _hover={{
                      color: "#F4BB4E",
                      cursor: "pointer",
                    }}
                    p={5}
                    borderRadius={"12px"}
                    bg={"linear-gradient(90deg, #0776FF 0%, #225498 100%)"}
                  >
                    {item.icon}
                    <Text
                      ml={2}
                      fontFamily={"body"}
                      fontSize="18px"
                      fontWeight={"600"}
                      display={["none", "none", "none", "block"]}
                    >
                      {item.label}
                    </Text>
                  </Flex>
                ) : (
                  <Flex
                    key={item.key}
                    align={"center"}
                    justify="center"
                    color="white"
                    _hover={{
                      color: "#F4BB4E",
                      cursor: "pointer",
                    }}
                    p={5}
                    borderRadius={"12px"}
                  >
                    {item.icon}
                    <Text
                      ml={2}
                      fontFamily={"body"}
                      fontSize="18px"
                      fontWeight={"600"}
                      display={["none", "none", "none", "block"]}
                    >
                      {item.label}
                    </Text>
                  </Flex>
                )}
              </NavLink>
            ))}
          </Flex>
          <Flex
            direction={"column"}
            justify="center"
            align={"start"}
            ml={8}
            mb={5}
          >
            <Flex
              align={"center"}
              justify="center"
              p={5}
              color="white"
              borderRadius={"12px"}
              _hover={{
                color: "#F4BB4E",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              <LogOut size={"28px"} />
              <Text
                ml={2}
                fontFamily={"body"}
                fontSize="18px"
                fontWeight={"600"}
                display={["none", "none", "none", "block"]}
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
