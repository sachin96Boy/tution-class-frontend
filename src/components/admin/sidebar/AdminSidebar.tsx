import Logo from "@/components/Logo";
import { Box, Button, Flex, GridItem, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  FaBriefcase,
  FaHome,
  FaMoneyBillAlt,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";

function AdminSidebar() {
  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  let variantChange = "0.2s linear";

  let location = useLocation();

  const checkActive = (route: string) => {
    return location.pathname === route ? "active" : "";
  };

  const navLinks = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
      route: "dashboard",
    },
    {
      title: "Attandance",
      icon: <FaRegCalendarCheck />,
      path: "/admin/attandance",
      route: "attandance",
    },
    {
      title: "Payments",
      icon: <FaMoneyBillAlt />,
      path: "/admin/payments",
      route: "payments",
    },
    {
      title: "Expences",
      icon: <FaBriefcase />,
      path: "/admin/expences",
      route: "expences",
    },
    {
      title: "Reports",
      icon: <TbReport />,
      path: "/admin/reports",
      route: "reports",
    },
    {
      title: "Users",
      icon: <BsFillPeopleFill />,
      path: "/admin/users",
      route: "users",
    },
    {
      title: "Students",
      icon: <BsFillPeopleFill />,
      path: "/admin/students",
      route: "students",
    },
    {
      title: "Assignments",
      icon: <BsFillPeopleFill />,
      path: "/admin/assignments",
      route: "assignments",
    },
  ];

  return (
    <Box display={{ sm: "none", xl: "block" }}>
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="260px"
        maxW="260px"
        ms={{
          sm: "16px",
        }}
        my={{
          sm: "16px",
        }}
        h="calc(100vh - 32px)"
        ps="20px"
        pe="20px"
        m={sidebarMargins}
        borderRadius={sidebarRadius}
      >
        <Logo boxSize="24" linkPath="/admin/dashboard" fitType="cover" />

        {navLinks.map((item, index) => (
          <NavLink to={item.path} key={index}>
            {checkActive(item.path) === "active" ? (
              <Button
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                bg="white"
                mb={{
                  xl: "12px",
                }}
                mx={{
                  xl: "auto",
                }}
                py="12px"
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                borderRadius="15px"
                w="100%"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Flex gap={2} alignItems={"center"} justify={"space-around"}>
                  <Box
                    padding={2}
                    rounded={"xl"}
                    bg={"primary_color"}
                    color={"white"}
                  >
                    <Icon size={"lg"}>{item.icon}</Icon>
                  </Box>
                  <Text
                    my="auto"
                    fontSize="md"
                    fontWeight={"bold"}
                    color={"GrayText"}
                  >
                    {item.title}
                  </Text>
                </Flex>
              </Button>
            ) : (
              <Button
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                bg="transparent"
                mb={{
                  xl: "12px",
                }}
                mx={{
                  xl: "auto",
                }}
                py="12px"
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                borderRadius="15px"
                w="100%"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Flex gap={2} alignItems={"center"} justify={"space-around"}>
                  <Box
                    padding={2}
                    rounded={"xl"}
                    bg={"white"}
                    color={"primary_color"}
                  >
                    <Icon size={"lg"}>{item.icon}</Icon>
                  </Box>
                  <Text
                    my="auto"
                    fontSize="md"
                    fontWeight={"bold"}
                    color={"GrayText"}
                  >
                    {item.title}
                  </Text>
                </Flex>
              </Button>
            )}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
}

export default AdminSidebar;
