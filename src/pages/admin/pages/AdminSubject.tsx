import SubjectForm from "@/components/admin/forms/SubjectForm";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import PaymentTableBody from "@/components/admin/payments/PaymentTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

function AdminSubject() {
  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Subject"}
          modalTitle={"Add Subject"}
          formComponent={<SubjectForm />}
        />
      </Box>
      <Box>
        <OverlayTable
          title={"Subject Data"}
          captions={["id", "subject"]}
          tableBodyComponent={<PaymentTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminSubject;
