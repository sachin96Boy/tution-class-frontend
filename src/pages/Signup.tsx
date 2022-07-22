import { Center, Flex, Image, Text } from "@chakra-ui/react";
import Sipsalogo from "../assets/signin/Sipsa_logo.png";
import React from "react";
import RegisterForm from "../components/formcontrol/RegisterForm";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <Flex flexDirection={"column"} align="center" w="full" m="10">
      <Center>
        <Link to={"/"}>
          <Image
            src={Sipsalogo}
            boxSize="36"
            objectFit={"contain"}
            alt="Sipsa Institute"
          />
        </Link>
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
