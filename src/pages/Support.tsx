import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../components/Logo";

function Support() {
  return (
    <Flex>
      {/* contact Us Section */}
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent="center"
        gap={2}
      >
        <Text fontFamily={"body"} fontSize={"3xl"} fontWeight={"bold"}>
          Write Us Your Questions
        </Text>
        
      </Flex>
      {/* Sipsa Logo */}
      <Logo boxSize={"52"} linkPath={"/"} fitType={"Cover"} />
    </Flex>
  );
}

export default Support;
