import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Portal,
  Stack,
  Text,
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
import React from "react";
import { NavLink } from "react-router-dom";

type IdrawerProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function AdminDrawer(props: IdrawerProps) {
  const { open, onClose, onOpen } = props;

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

  const RenderMobileView = () => {
    return (
      <Box pb={4} display={{ md: "none" }}>
        <Flex
          flexDir={"column"}
          align={"start"}
          justify={"start"}
          as={"nav"}
          gap={4}
        >
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
        </Flex>
      </Box>
    );
  };

  return (
    <Drawer.Root
      placement={"start"}
      onOpenChange={(e) => {
        e.open ? onClose() : onOpen();
      }}
    >
      <Drawer.Trigger asChild>
        <IconButton
          size={"md"}
          aria-label={"Open Menu"}
          variant={"ghost"}
          display={{ md: "none" }}
        >
          {<MenuIcon />}
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <RenderMobileView />
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

export default AdminDrawer;
