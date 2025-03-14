import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <Flex bg={"gray.100"}>
      <AdminSidebar />

      <Box
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
        overflowY={"auto"}
        gap={4}
        ml={{
          base: "4",
          xl: "275px",
        }}
        mr={4}
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default AdminLayout;
