import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Cta = () => {
  const buttonSize = useBreakpointValue<
    "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  >({ base: "md", md: "lg" });

  const navigate = useNavigate();

  return (
    <Box bg="blue.50" py={16}>
      <Container maxW="container.lg">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          textAlign={{ base: "center", md: "left" }}
        >
          <VStack
            gap={4}
            align={{ base: "center", md: "flex-start" }}
            maxW="2xl"
          >
            <Heading as="h2" size="xl" color="blue.900">
              Ready to Get Started?
            </Heading>
            <Text fontSize="lg" color="blue.800">
              Join thousands of satisfied Students and experience the best
              service in the industry.
            </Text>
          </VStack>
          <Button
            colorPalette="blue"
            size={buttonSize}
            mt={{ base: 6, md: 0 }}
            px={8}
            py={6}
            fontSize="lg"
            onClick={() => navigate("login")}
          >
            Sign In
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Cta;
