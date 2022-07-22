import { Center, Flex, Image } from "@chakra-ui/react";
import Sipsalogo from "../assets/signin/Sipsa_logo.png";
import React from "react";
import RegisterForm from "../components/formcontrol/RegisterForm";

function Signup() {
  return (
    <Flex flexDirection={"column"} align="center" w="full" m="10">
      <Center>
        <Image
          src={Sipsalogo}
          boxSize="36"
          objectFit={"contain"}
          alt="Sipsa Institute"
        />
      </Center>
      <Flex align={"center"} justify="center" my={"20"}>
        <RegisterForm />
      </Flex>
    </Flex>
  );
}

export default Signup;
