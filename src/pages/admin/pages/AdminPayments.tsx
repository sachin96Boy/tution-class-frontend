import AdminLoginComponent from "@/components/admin/forms/AdminLoginComponent";
import PaymentsFormComponent from "@/components/admin/forms/PaymentsFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

function AdminPayments() {
  return (
    <Flex gap={4} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Payment"}
          modalTitle={"Add Payment Data"}
          formComponent={<PaymentsFormComponent />}
        />
      </Box>
      <Box>Attandance chart</Box>
    </Flex>
  );
}

export default AdminPayments;
