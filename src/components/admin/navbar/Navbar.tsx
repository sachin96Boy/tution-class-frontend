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
import AdminDrawer from "../drawer/AdminDrawer";



export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const { token, coporateInfo } = useSelector((state: RootState) => state.auth);

  const { open, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box bg={"gray.100"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <AdminDrawer onClose={onClose} onOpen={onOpen} open={open} />
          <Box display={["block", "block", "none"]}>
            <Logo boxSize="14" linkPath="/admin/dashboard" fitType="cover" />
          </Box>
          <Spacer display={["none", "none", "block"]} />
          <Flex align={"end"}>
            <Menu.Root
              positioning={{
                placement: "top-end",
              }}
            >
              <Menu.Trigger outline={"none"} pt={[0, 0, 4]} asChild>
                <Box as={"button"} outline={"none"} cursor={"pointer"}>
                  <Avatar.Root size={["sm", "md"]}>
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
      </Box>
    </>
  );
}
