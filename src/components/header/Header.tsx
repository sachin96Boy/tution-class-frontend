import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Header_Logo from "../../assets/header/logos/Sipsa_logo.png";

function Header() {
  return (
    <Box backgroundColor={"white"} top="0" position={"sticky"} w="full">
      <Flex align={"center"} justify="space-between" mx={10}>
        <Box className="class-logo">
          <Image
            boxSize={"100px"}
            src={Header_Logo}
            objectFit="cover"
            alt="sipsa Institute"
          />
        </Box>
        <Box className="Teacher-List">
          <Button
            border={"10px"}
            bg="linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
          >
            <Text>Teacher List</Text>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
