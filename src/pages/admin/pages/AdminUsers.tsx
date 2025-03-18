import UserFormComponent from "@/components/admin/forms/UserFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import UsersTableBody from "@/components/admin/users/UsersTableBody";
import { Box, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";

function AdminUsers() {
  return (
    <Flex
      gap={2}
      minH={"100vh"}
      flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <Box>
        <Modalsheet
          buttonText={"Create User"}
          modalTitle={"Create User Data"}
          formComponent={<UserFormComponent />}
        />
      </Box>
      <Box>
        <OverlayTable
          title={"Users Data"}
          captions={["UserId", "Usernme", "Role", "email", "Status"]}
          tableBodyComponent={<UsersTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminUsers;
