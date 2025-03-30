import TeacherFormComponent from "@/components/admin/forms/TeacherFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TeacherTableBody from "@/components/admin/teacher/TeacherTableBody";
import Spinner from "@/components/spinner/Spinner";
import { RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function AdminTeachers() {
  const { loading, teachers } = useSelector(
    (state: RootState) => state.teacher
  );

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Create Teacher"}
          modalTitle={"Add Teacher Data"}
          formComponent={<TeacherFormComponent />}
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            title={"Teacher Data"}
            captions={["TeacherId", "Full Name", "description"]}
            tableBodyComponent={<TeacherTableBody data={teachers} />}
            data={teachers}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminTeachers;
