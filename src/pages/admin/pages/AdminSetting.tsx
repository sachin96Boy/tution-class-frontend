import { Box, Tabs } from "@chakra-ui/react";
import { Building, Clock11, Headphones } from "lucide-react";
import React from "react";
import CompanySettings from "./settings/CompanySettings";

function AdminSetting() {
  return (
    <Box padding={2}>
      <Tabs.Root defaultValue="company" variant={"line"}>
        <Tabs.List>
          <Tabs.Trigger value="company">
            <Building />
            Company
          </Tabs.Trigger>
          <Tabs.Trigger value="help">
            <Headphones />
            Suport
          </Tabs.Trigger>
          <Tabs.Trigger value="soon">
            <Clock11 />
            Coming soon
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="company">
          <CompanySettings />
        </Tabs.Content>
        <Tabs.Content value="help">s2</Tabs.Content>
        <Tabs.Content value="soon">s3</Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

export default AdminSetting;
