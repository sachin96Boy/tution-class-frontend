import React from "react";
import { Center, Flex, Text } from "@chakra-ui/react";
import RegisterForm from "../components/formcontrol/RegisterForm";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function Signup() {
  return (
    <Flex flexDirection={"column"} align="center" w="full" minH="100vh" bg={"gray.200"} >
      <Center>
      <Logo boxSize={"36"} linkPath={"/"} fitType={"Contain"}/>
      </Center>
      <Flex align={"center"} justify="center" my={"20"}>
        <RegisterForm />
      </Flex>
      <Flex flexDir={"column"} align="center" justify={"center"}>
        <Text fontSize="12px" fontWeight={"600"} color="#636363">
          Already A User?{" "}
          <Text as={"span"} mx={3} color="blue">
            <Link to={"/"}>LogIn</Link>
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}

export default Signup;
