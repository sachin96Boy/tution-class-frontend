import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <Flex bg={'light_bg_card'}>
      <AdminSidebar />
      <Box
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default AdminLayout;
