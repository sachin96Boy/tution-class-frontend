import { Box, Flex, Image, Text } from "@chakra-ui/react";
import signinBg from "../assets/signin/bg-signin.jpg";
import SipsaLogo from "../assets/signin/Sipsa_logo.png";
import React from "react";
import Signinform from "../components/formcontrol/Signinform";

function Signin() {
  return (
    <Flex align={"center"} w="full">
      <Image
        src={signinBg}
        w="50%"
        h={"full"}
        objectFit="cover"
        alt="sipsaWeb-Signin"
      />
      <Flex flex={"1"} align="center" flexDir={"column"} justify={"center"}>
        <Box className="logo">
          <Image src={SipsaLogo} boxSize="52" alt="Sipsa Education" />
        </Box>
        <Text
          fontFamily={"body"}
          fontSize="22px"
          fontWeight={"600"}
          color="#215DA7"
          my={1}
        >
          Good to see You Again!
        </Text>
        <Flex w={"300px"} align="center">
          <Text
            fontFamily={"body"}
            fontSize="15px"
            fontWeight={"600"}
            color="#636363"
            align={"center"}
            my={2}
          >
            By logging into Sipsa Institute, you agree to our Terms of use and
            Privacy Policy.
          </Text>
        </Flex>
        <Signinform />
      </Flex>
    </Flex>
  );
}

export default Signin;
