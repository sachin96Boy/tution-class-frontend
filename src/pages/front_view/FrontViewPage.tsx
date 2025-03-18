import Header from "@/components/header/Header";
import React from "react";
import DevFooter from "@/components/footer/DevFooter";
import { Box } from "@chakra-ui/react";
import HomePage from "../HomePage";
import Testomonials from "@/components/testimonials/Testomonials";

function FrontViewPage() {
  return (
    <Box bg={"gray.50"}>
      <Header />
      <HomePage />
      <Testomonials />
      <DevFooter />
    </Box>
  );
}

export default FrontViewPage;
