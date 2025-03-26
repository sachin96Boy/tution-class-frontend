import React from "react";

import AdminLoginComponent from "@/components/admin/forms/AdminLoginComponent";
import Logo from "@/components/Logo";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import bgImage from "@/assets/signin/class-2.webp";

function AdminSigninScreen() {
  const titleColor = useColorModeValue("black", "black");
  const textColor = useColorModeValue("gray.400", "white");
  // Chakra color mode
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            {/* logo */}
            <Logo boxSize={"52"} linkPath={"/"} fitType="cover" />
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back Corporate Member
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>

            <AdminLoginComponent />
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={`url(${bgImage})`}
            w="100%"
            h="100%"
            bgSize="cover"
            backgroundPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default AdminSigninScreen;
