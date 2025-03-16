import AttandanceMarkForm from "@/components/admin/forms/AttandanceMarkForm";
import QrScanner from "@/components/admin/scanner/QrScanner";
import { Button, Card, Center, Flex, Icon, Tabs, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { LuUserPen } from "react-icons/lu";

function AdminAttandance() {
  const [showScanner, setShowScanner] = useState(false);

  const markVisibility = () => {
    setShowScanner(!showScanner);
  };

  const students = ["student1", "student2", "student3", "student4", "student5"];
  const courses = ["course1", "course2", "course3", "course4", "course5"];

  const CustomQRCardComponent = () => {
    return (
      <Card.Root maxW={"lg"}>
        <Card.Header>
          <Button colorPalette={"blue"} onClick={markVisibility}>
            {showScanner ? "Hide scanner" : "Show scanner"}
          </Button>
        </Card.Header>
        <Card.Body>
          <QrScanner visibility={showScanner} />
        </Card.Body>
      </Card.Root>
    );
  };

  return (
    <Flex
      width={"full"}
      align={"center"}
      justify={"center"}
      minH={"100vh"}
      gap={4}
      flexDir={"column"}
    >
      <Tabs.Root variant={"subtle"} defaultValue={"qr"} padding={4} gap={2}>
        <Tabs.List bg={"gray.200"} rounded={"2xl"} padding={"2"} width={"full"}>
          <Tabs.Trigger value="qr">
            <Icon>
              <BsQrCode />
            </Icon>
            Mark Attandance based on QR
          </Tabs.Trigger>
          <Tabs.Trigger value="manual">
            <Icon>
              <LuUserPen />
            </Icon>
            Manual Attandance Mark
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="qr">
          <CustomQRCardComponent />
        </Tabs.Content>
        <Tabs.Content value="manual">
          <Card.Root>
            <Card.Body>
              <AttandanceMarkForm studentList={students} courseList={courses} />
            </Card.Body>
          </Card.Root>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default AdminAttandance;
