import { Flex, Tabs } from "@chakra-ui/react";
import React from "react";
import AdminGrade from "./AdminGrade";
import AdminSubject from "./AdminSubject";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function AdminCommonSection() {
  const { grades, subjects } = useSelector((state: RootState) => state.common);

  return (
    <Flex gap={4} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Tabs.Root
        padding={4}
        gap={2}
        fitted
        defaultValue={"grade"}
        variant={"subtle"}
      >
        <Tabs.List bg={"gray.200"} rounded={"2xl"} padding={"2"} width={"full"}>
          <Tabs.Trigger value="grade">Grades</Tabs.Trigger>
          <Tabs.Trigger value="subject">Subjects</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="grade">
          <AdminGrade grades={grades} />
        </Tabs.Content>
        <Tabs.Content value="subject">
          <AdminSubject subjects={subjects} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default AdminCommonSection;
