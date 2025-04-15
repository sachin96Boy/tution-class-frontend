import { Flex, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import ContactUsForm from "../components/formcontrol/ContactUsForm";
import Logo from "../components/Logo";
import ServicesSection from "./ServiceSection";

const SupportContent = () => {
  return (
    <Flex
      align={"center"}
      flexDirection="column"
      justify={"space-between"}
      mx={"10"}
      w="full"
    >
      {/* Sipsa Logo */}
      <Logo boxSize={"48"} linkPath={"/"} fitType={"cover"} />
      {/* contact Us Section */}
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent="center"
        gap={2}
        flex={1}
      >
        <Text fontFamily={"body"} fontSize={"6xl"} fontWeight={"bold"}>
          Write Us Your Questions
        </Text>
        <ContactUsForm />
      </Flex>
    </Flex>
  );
};

function Support() {
  return (
    <Tabs.Root
      width={"full"}
      variant="enclosed"
      fitted
      defaultValue={"tab-1"}
      padding={"4"}
    >
      <Tabs.List>
        <Tabs.Trigger value="support">Support</Tabs.Trigger>
        <Tabs.Trigger value="feedback">Feedback</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="support">
        <ServicesSection />
      </Tabs.Content>
      <Tabs.Content value="feedback">
        <SupportContent />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default Support;
