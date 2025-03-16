import { Flex, Tabs } from "@chakra-ui/react";
import React from "react";
import AdminPayments from "./AdminPayments";
import AdminExpences from "./AdminExpences";

function AdminAccounting() {
  return (
    <Flex
      minH={"100vh"}
      gap={4}
      flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <Tabs.Root
        padding={4}
        gap={2}
        fitted
        defaultValue={"payments"}
        variant={"subtle"}
      >
        <Tabs.List bg={"gray.200"} rounded={"2xl"} padding={"2"} width={"full"}>
          <Tabs.Trigger value="payments">Payments</Tabs.Trigger>
          <Tabs.Trigger value="expences">Expences</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="payments">
          <AdminPayments />
        </Tabs.Content>
        <Tabs.Content value="expences">
          <AdminExpences />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default AdminAccounting;
