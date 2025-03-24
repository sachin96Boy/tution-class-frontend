import { Container, Flex, Image, Stack, Text } from "@chakra-ui/react";
import signinBg from "../assets/signin/bg-signin.jpg";
import Signinform from "../components/formcontrol/Signinform";
import Logo from "../components/Logo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Signin() {
  const { company } = useSelector((state: RootState) => state.config);

  return (
    <Flex
      flexDirection={["column", "column", "row"]}
      align={"center"}
      w="full"
      minHeight={"100vh"}
      h={["full", "full", "100vh"]}
      bg={"white"}
    >
      <Image
        src={signinBg}
        display={["none", "none", "flex"]}
        w="50%"
        minH={"100vh"}
        objectFit="cover"
        alt="sipsaWeb-Signin"
      />
      <Container maxW={"lg"}>
        <Flex flex={"1"} align="center" flexDir={"column"} justify={"center"}>
          <Logo boxSize={"52"} linkPath={"/"} fitType="cover" />
          <Text
            fontFamily={"body"}
            fontSize="22px"
            fontWeight={"600"}
            color="primary_color"
            my={1}
          >
            Good to see You Again!
          </Text>
          <Flex w={"300px"} align="center">
            <Text
              fontFamily={"body"}
              fontSize="15px"
              fontWeight={"600"}
              color="secondary_title_color"
              my={2}
            >
              By logging into{" "}
              {company && company.length > 0 ? company[0].name : ""}, you agree
              to our Terms of use and Privacy Policy.
            </Text>
          </Flex>
          <Stack gap={4}>
            <Signinform />
          </Stack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Signin;
