import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import ContactUsForm from "../components/formcontrol/ContactUsForm";
import Logo from "../components/Logo";

function Support() {
  return (
    <Flex
      align={"center"}
      flexDirection="column"
      justify={"space-between"}
      mx={"10"}
      w="full"
    >
      {/* Sipsa Logo */}
      <Logo boxSize={"48"} linkPath={"/"} fitType={"cover"} />
      {/* contact Us Section */}
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent="center"
        gap={2}
        flex={1}
      >
        <Text fontFamily={"body"} fontSize={"6xl"} fontWeight={"bold"}>
          Write Us Your Questions
        </Text>
        <ContactUsForm />
      </Flex>
    </Flex>
  );
}

export default Support;
