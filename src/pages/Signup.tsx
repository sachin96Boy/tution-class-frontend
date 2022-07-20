import { Center, Flex, Image } from "@chakra-ui/react";
import Sipsalogo from "../assets/signin/Sipsa_logo.png";
import React from "react";

function Signup() {
  return (
    <Flex>
      <Center>
        <Image src={Sipsalogo} alt="Sipsa Institute" />
      </Center>
    </Flex>
  );
}

export default Signup;
