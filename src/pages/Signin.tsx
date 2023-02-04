import { Box, Flex, Image, Text } from "@chakra-ui/react";
import signinBg from "../assets/signin/bg-signin.jpg";
import SipsaLogo from "../assets/signin/Sipsa_logo.png";
import React, {useEffect} from "react";
import Signinform from "../components/formcontrol/Signinform";
import queryString from 'query-string';
import useToastResponse from "../components/toast/ToastResponse";


function Signin() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, newToast] = useToastResponse();

  useEffect(()=>{
    const value = queryString.parse(window.location.search);
    if(value.emailVerified === 'true'){
      newToast({
        status: 'success',
        title: 'Email verified',
      })
    }
    if(value.emailVerified === 'false'){
      newToast({
        status: 'error',
        title: 'Email not verified',
      })
    }
  },[newToast])

  return (
    <Flex flexDirection={['column','column','row']} align={"center"} w="full" h={"100vh"} bg={"gray.200"}>
      <Image
        src={signinBg}
        display={['none','none','flex']}
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
