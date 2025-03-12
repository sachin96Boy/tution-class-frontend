import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";

function SideBar() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    navigate(`/dashboard/${menu}`);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const sideBarMenuList = [
    {
      icon: <MdDashboard size={"28px"} />,
      label: "Dashboard",
      key: "dashboard",
    },
    {
      icon: <GiBookshelf size={"28px"} />,
      label: "My Courses",
      key: "myCourses",
    },
    {
      icon: <BsHeadset size={"28px"} />,
      label: "Support",
      key: "support",
    },
    {
      icon: <FaUser size={"28px"} />,
      label: "My Account",
      key: "myAccount",
    },
  ];

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
                    <TbCameraPlus size={"28"} style={{ color: "#ffffffff" }} />
                  </Avatar.Icon>
                </Avatar.Fallback>
              </Avatar.Root>
            </Box>
          </Box>

          <Flex
            direction={"column"}
            display={["none", "none", "none", "block"]}
          >
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
    );
  };

  return (
    <Box
      bg={"white"}
      as="div"
      h="calc(100vh-100px)"
      display={["none", "none", "block"]}
    >
      <Flex
        direction={"column"}
        align="start"
        justifyContent="space-between"
        h="100%"
      >
        {token && <ProfileMenu />}

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
            {sideBarMenuList.map((item) => (
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
                bg={
                  activeMenu === item.key
                    ? "linear-gradient(90deg, #0776FF 0%, #225498 100%)"
                    : ""
                }
                onClick={() => handleMenuClick(item.key)}
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
            ))}
          </Flex>
          <Flex
            direction={"column"}
            justify="center"
            align={"start"}
            ml={8}
            mb={5}
          >
            {token && (
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
                <FiLogOut size={"28px"} />
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
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default SideBar;
