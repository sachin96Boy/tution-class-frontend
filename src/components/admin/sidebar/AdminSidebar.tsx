import Logo from "@/components/Logo";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";

import { BsBookHalf, BsFillPeopleFill } from "react-icons/bs";
import {
  FaBookReader,
  FaChalkboardTeacher,
  FaHome,
  FaMoneyBillAlt,
  FaRegCalendarCheck,
  FaTable,
} from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { PiStudentBold } from "react-icons/pi";
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
      title: "Accounting",
      icon: <FaMoneyBillAlt />,
      path: "/admin/accounting",
      route: "accounting",
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
      icon: <PiStudentBold />,
      path: "/admin/students",
      route: "students",
    },
    {
      title: "Teachers",
      icon: <FaChalkboardTeacher />,
      path: "/admin/teachers",
      route: "teachers",
    },
    {
      title: "Time Table",
      icon: <FaTable />,
      path: "/admin/time-table",
      route: "time-table",
    },
    {
      title: "Assignments",
      icon: <FaBookReader />,
      path: "/admin/assignments",
      route: "assignments",
    },
    {
      title: "Courses",
      icon: <BsBookHalf />,
      path: "/admin/courses",
      route: "courses",
    },
  ];

  return (
    <Box>
      <Box
        display={{ base: "none", md: "block" }}
        position={"fixed"}
        overflowY={"auto"}
      >
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
          <Logo boxSize="24" linkPath="/admin" fitType="cover" />

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
    </Box>
  );
}

export default AdminSidebar;
