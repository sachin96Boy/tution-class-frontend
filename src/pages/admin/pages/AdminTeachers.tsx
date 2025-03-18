import TeacherFormComponent from "@/components/admin/forms/TeacherFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TeacherTableBody from "@/components/admin/teacher/TeacherTableBody";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

function AdminTeachers() {
  return (
    <Flex
      gap={2}
      minH={"100vh"}
      flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <Box>
        <Modalsheet
          buttonText={"Create Teacher"}
          modalTitle={"Add Teacher Data"}
          formComponent={<TeacherFormComponent />}
        />
      </Box>
      <Box>
        <OverlayTable
          title={"Teacher Data"}
          captions={["TeacherId", "Full Name", "description"]}
          tableBodyComponent={<TeacherTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminTeachers;
