import Logo from "@/components/Logo";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import {
  Banknote,
  BookA,
  BookOpen,
  CalendarCheck,
  ClipboardPlus,
  GraduationCap,
  House,
  Settings,
  Sheet,
  UserRoundPen,
  Users,
} from "lucide-react";

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
      icon: <House />,
      path: "/admin/dashboard",
      route: "dashboard",
    },
    {
      title: "Attandance",
      icon: <CalendarCheck />,
      path: "/admin/attandance",
      route: "attandance",
    },
    {
      title: "Accounting",
      icon: <Banknote />,
      path: "/admin/accounting",
      route: "accounting",
    },
    {
      title: "Reports",
      icon: <ClipboardPlus />,
      path: "/admin/reports",
      route: "reports",
    },
    {
      title: "Users",
      icon: <Users />,
      path: "/admin/users",
      route: "users",
    },
    {
      title: "Students",
      icon: <GraduationCap />,
      path: "/admin/students",
      route: "students",
    },
    {
      title: "Teachers",
      icon: <UserRoundPen />,
      path: "/admin/teachers",
      route: "teachers",
    },
    {
      title: "Time Table",
      icon: <Sheet />,
      path: "/admin/time-table",
      route: "time-table",
    },
    {
      title: "Assignments",
      icon: <BookA />,
      path: "/admin/assignments",
      route: "assignments",
    },
    {
      title: "Courses",
      icon: <BookOpen />,
      path: "/admin/courses",
      route: "courses",
    },
    {
      title: "Settings",
      icon: <Settings />,
      path: "/admin/settings",
      route: "settings",
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
          <Logo boxSize="14" linkPath="/admin" fitType="cover" />

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
