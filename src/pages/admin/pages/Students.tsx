import StudentsTableBody from "@/components/admin/student/StudentTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";

import Spinner from "@/components/spinner/Spinner";
import { getAllStudents } from "@/features/student/studentAction";
import { getAllUsers } from "@/features/users/userAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Students() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, students } = useSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    dispatch(getAllStudents(""));
  }, [dispatch]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            title={"Student Data"}
            captions={["UserId", "Fullname", "Role", "email", "Status"]}
            tableBodyComponent={<StudentsTableBody data={students} />}
            data={students}
          />
        )}
      </Box>
    </Flex>
  );
}

export default Students;
