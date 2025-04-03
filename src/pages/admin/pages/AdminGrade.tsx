import GradeForm from "@/components/admin/forms/GradeInfoForm";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import PaymentTableBody from "@/components/admin/payments/PaymentTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

function AdminGrade() {
  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Grade"}
          modalTitle={"Add Data on Grade"}
          formComponent={<GradeForm />}
        />
      </Box>
      <Box>
        <OverlayTable
          title={"Grade Data"}
          captions={["id", "grade"]}
          tableBodyComponent={<PaymentTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminGrade;
