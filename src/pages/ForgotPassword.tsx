import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Logo from "../components/Logo";
import { Field } from "@/components/ui/field";

function ForgotPassword() {
  return (
    <Flex
      minH={"100vh"}
      flexDirection={"column"}
      align={"center"}
      justify={"center"}
      bg={"gray.200"}
    >
      <Center>
        <Logo boxSize={"36"} linkPath={"/"} fitType={"Contain"} />
      </Center>
      <Stack
        gap={4}
        w={"full"}
        maxW={"md"}
        bg={"white"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text fontSize={{ base: "sm", sm: "md" }} color={"gray.800"}>
          You&apos;ll get an email with a reset link
        </Text>
        <Field htmlFor="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            id="email"
          />
        </Field>
        <Stack gap={6}>
          <Button
            colorScheme="blue"
            bgGradient={
              "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            }
            boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;
