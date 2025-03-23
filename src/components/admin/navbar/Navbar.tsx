"use client";

import Logo from "@/components/Logo";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useDisclosure,
  Stack,
  Portal,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import { BsBookHalf, BsFillPeopleFill } from "react-icons/bs";
import {
  FaBookReader,
  FaChalkboardTeacher,
  FaHome,
  FaMoneyBillAlt,
  FaRegCalendarCheck,
  FaTable,
} from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { TbReport } from "react-icons/tb";
import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

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

export default function Navbar() {
  const { open, onOpen, onClose } = useDisclosure();

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
            {open ? <IoMdClose /> : <IoMdMenu />}
          </IconButton>
          <Box display={["block", "block", "none"]}>
            <Logo boxSize="24" linkPath="/admin/dashboard" fitType="cover" />
          </Box>
          <Spacer display={['none','none','block']} />
          <Flex align={"end"}>
            <Menu.Root
              positioning={{
                placement: "top-end",
              }}
              
            >
              <Menu.Trigger outline={"none"} pt={[0,0,8]}>
                <Box as={"button"} outline={"none"} cursor={"pointer"}>
                  <Avatar.Root size={'md'}>
                    <Avatar.Fallback name="Oshigaki Kisame" />
                    <Avatar.Image src="https://bit.ly/broken-link" />
                  </Avatar.Root>
                </Box>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
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

        {open ? (
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
        ) : null}
      </Box>
    </>
  );
}
