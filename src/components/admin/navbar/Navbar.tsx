"use client";

import Logo from "@/components/Logo";
import { logout } from "@/features/auth/authSlice";
import { AppDispatch, RootState } from "@/store";
import {
  Box,
  Flex,
  Avatar,
  Text,
  IconButton,
  Menu,
  useDisclosure,
  Stack,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import {
  Banknote,
  BookA,
  BookOpen,
  CalendarCheck,
  ClipboardPlus,
  GraduationCap,
  House,
  MenuIcon,
  Sheet,
  UserRoundPen,
  Users,
  X,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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
];

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const { token, coporateInfo } = useSelector((state: RootState) => state.auth);

  const { open, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderMobileView = () => {
    return (
      <Box pb={4} display={{ md: "none" }}>
        <Stack as={"nav"} gap={4}>
          {navLinks.map((link, index) => (
            <NavLink to={link.path} key={index}>
              <Flex gap={2} alignItems={"center"} justify={"space-around"}>
                <Box
                  padding={2}
                  rounded={"xl"}
                  bg={"white"}
                  color={"primary_color"}
                >
                  <Icon size={"lg"}>{link.icon}</Icon>
                </Box>
                <Text
                  my="auto"
                  fontSize="md"
                  fontWeight={"bold"}
                  color={"GrayText"}
                >
                  {link.title}
                </Text>
              </Flex>
            </NavLink>
          ))}
        </Stack>
      </Box>
    );
  };

  return (
    <>
      <Box bg={"gray.100"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            aria-label={"Open Menu"}
            variant={"ghost"}
            display={{ md: "none" }}
            onClick={open ? onClose : onOpen}
          >
            {open ? <X /> : <MenuIcon />}
          </IconButton>
          <Box display={["block", "block", "none"]}>
            <Logo boxSize="24" linkPath="/admin/dashboard" fitType="cover" />
          </Box>
          <Spacer display={["none", "none", "block"]} />
          <Flex align={"end"}>
            <Menu.Root
              positioning={{
                placement: "top-end",
              }}
            >
              <Menu.Trigger outline={"none"} pt={[0, 0, 8]} asChild>
                <Box as={"button"} outline={"none"} cursor={"pointer"}>
                  <Avatar.Root size={"md"}>
                    <Avatar.Fallback name={coporateInfo?.userName} />
                    <Avatar.Image src={coporateInfo?.userName} />
                  </Avatar.Root>
                </Box>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    onClick={handleLogout}
                    value="delete"
                    color="fg.error"
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </Flex>
        </Flex>

        {open && renderMobileView()}
      </Box>
    </>
  );
}
