import TeacherFormComponent from "@/components/admin/forms/TeacherFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TeacherTableBody from "@/components/admin/teacher/TeacherTableBody";
import Spinner from "@/components/spinner/Spinner";
import { IteacherGetProps } from "@/features/teacher/teacherAction";
import { RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AdminTeachers() {
  const { loading, teachers } = useSelector(
    (state: RootState) => state.teacher
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IteacherGetProps>>(teachers);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = teachers.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [teachers]);

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
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Teacher Data"}
            captions={["TeacherId", "Full Name", "description"]}
            tableBodyComponent={<TeacherTableBody data={items} />}
            data={teachers}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminTeachers;
