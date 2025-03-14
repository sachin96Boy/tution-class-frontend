import Header from "@/components/header/Header";
import React from "react";
import DevFooter from "@/components/footer/DevFooter";
import { Box } from "@chakra-ui/react";
import HomePage from "../HomePage";

function FrontViewPage() {
  return (
    <Box bg={"gray.50"}>
      <Header />
      <HomePage />
      <DevFooter />
    </Box>
  );
}

export default FrontViewPage;
