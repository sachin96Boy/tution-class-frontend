import TeacherFormComponent from "@/components/admin/forms/TeacherFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TeacherTableBody from "@/components/admin/teacher/TeacherTableBody";
import Spinner from "@/components/spinner/Spinner";
import { getAllAdvertisments } from "@/features/advertisment/advertismentAction";
import {
  getAllTeachers,
  IteacherGetProps,
} from "@/features/teacher/teacherAction";
import { applyAdvsearch } from "@/features/teacher/teacherSlice";
import { AppDispatch, RootState } from "@/store";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminTeachers() {
  const dispatch = useDispatch<AppDispatch>();

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

  const handleSearh = (value: string) => {
    dispatch(applyAdvsearch(value));
    if (value.trim() === "") {
      dispatch(getAllTeachers(""));
    }
  };

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Create Teacher"}
          modalTitle={"Add Teacher Data"}
          formComponent={<TeacherFormComponent />}
        >
          <Button colorPalette={"blue"}>Create Teacher</Button>
        </Modalsheet>
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Teacher Data"}
            captions={["#", "Full Name", "description", "Action"]}
            tableBodyComponent={<TeacherTableBody data={items} />}
            data={teachers}
            handleSearch={handleSearh}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminTeachers;
