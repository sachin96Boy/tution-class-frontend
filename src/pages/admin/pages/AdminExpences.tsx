import ExpenceTableBody from "@/components/admin/expence/ExpenceTableBody";
import ExpenceFormComponent from "@/components/admin/forms/ExpenceFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

function AdminExpences() {
  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Expences"}
          modalTitle={"Add Expences Data"}
          formComponent={
            <ExpenceFormComponent expenceTypeList={[]} teacherList={[]} />
          }
        />
      </Box>
      <Box>
        <OverlayTable
          title={"Expences Data"}
          captions={["ExpencesId", "Type", "Amount", "Teacher", "Date"]}
          tableBodyComponent={<ExpenceTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminExpences;
