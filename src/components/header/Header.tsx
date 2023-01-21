import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header_Logo from "../../assets/header/logos/Sipsa_logo.png";

function Header() {
  const navigate = useNavigate();
  return (
    <Box
      backgroundColor={"white"}
      top="0"
      position={"sticky"}
      w="full"
      h={"100px"}
      display={"block"}
    >
      <Flex  align={"center"} justify="space-between" mx={10}>
        <Box className="class-logo">
          <Link to={"/dashboard"}>
            <Image
              boxSize={"100px"}
              src={Header_Logo}
              objectFit="cover"
              alt="sipsa Institute"
            />
          </Link>
        </Box>
        <Box className="Teacher-List">
          <Button
            border={"10px"}
            bgGradient="linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
            colorScheme={"yellow"}
            boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
            onClick={() => navigate("/dashboard/teacherList")}
          >
            <Text
              fontFamily={"body"}
              fontSize="21px"
              color="white"
              fontWeight={"400"}
            >
              Teachers List
            </Text>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
