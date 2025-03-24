"use client";

import { ReactNode } from "react";

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Logo from "../Logo";

const LogoFooter = (props: any) => {
  return <Logo boxSize={"24"} linkPath={"/"} fitType={"contain"} />;
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function DevFooter() {
  const { company } = useSelector((state: RootState) => state.config);
const year = new Date().getFullYear() 
  return (
    <Box bg="gray.50" color="gray.700">
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          gap={8}
        >
          <Stack gap={6}>
            <Box>
              <LogoFooter />
            </Box>
            <Text fontSize={"sm"}>
              © {year} {company[0]?.name}. All rights reserved
            </Text>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link href={"#"}>Overview</Link>
            <Link as="a" href={"#"}>
              Features
            </Link>
            <Link as="a" href={"#"}>
              Tutorials
            </Link>
            <Link as="a" href={"#"}>
              Pricing
            </Link>
            <Link as="a" href={"#"}>
              Releases
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link as="a" href={"#"}>
              About
            </Link>
            <Link as="a" href={"#"}>
              Press
            </Link>
            <Link as="a" href={"#"}>
              Careers
            </Link>
            <Link as="a" href={"#"}>
              Contact
            </Link>
            <Link as="a" href={"#"}>
              Partners
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link as="a" href={"#"}>
              Help Center
            </Link>
            <Link as="a" href={"#"}>
              Terms of Service
            </Link>
            <Link as="a" href={"#"}>
              Legal
            </Link>
            <Link as="a" href={"#"}>
              Privacy Policy
            </Link>
            <Link as="a" href={"#"}>
              Status
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link as="a" href={"#"}>
              Facebook
            </Link>
            <Link as="a" href={"#"}>
              Twitter
            </Link>
            <Link as="a" href={"#"}>
              Dribbble
            </Link>
            <Link as="a" href={"#"}>
              Instagram
            </Link>
            <Link as="a" href={"#"}>
              LinkedIn
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
