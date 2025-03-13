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

function AdminSidebar() {
  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  let variantChange = "0.2s linear";

  const navLinks = [
    {
      title: "Dashboard",
      icon: <FaHome />,
    },
    {
      title: "Attandance",
      icon: <FaRegCalendarCheck />,
    },
    {
      title: "Payments",
      icon: <FaMoneyBillAlt />,
    },
    {
      title: "Expences",
      icon: <FaBriefcase />,
    },
    {
      title: "Reports",
      icon: <TbReport />,
    },
    {
      title: "Users",
      icon: <BsFillPeopleFill />,
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
        {navLinks.map((item, index) => (
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
              <Box padding={2} rounded={"xl"} bg={"blue.700"}>
                <Icon size={"lg"} color={"white"}>
                  {item.icon}
                </Icon>
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
        ))}
      </Box>
    </Box>
  );
}

export default AdminSidebar;
