import AssignmentTableBody from "@/components/admin/assignment/AssignmentTableBody";
import AddAssignmentFormComponent from "@/components/admin/forms/AddAssignmentFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { getAllAdvertisments } from "@/features/advertisment/advertismentAction";
import { IAssignmentProps } from "@/features/assignment/assignmentAction";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses } from "@/features/course/courseAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Assignments() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, assignments } = useSelector(
    (state: RootState) => state.assignment
  );

  const { courses } = useSelector((state: RootState) => state.course);

  let coursesSelectList: Array<IListItemProp> = courses?.map((course) => {
    return {
      key: course.course_id,
      value: course.title,
      image_path: course.course_img_path,
    };
  });

  useEffect(() => {
    dispatch(getAllCourses(""));
    dispatch(getAllAdvertisments(""));
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IAssignmentProps>>(assignments);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = assignments.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [assignments]);
  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Assignment"}
          formComponent={
            <AddAssignmentFormComponent courseList={coursesSelectList} />
          }
          modalTitle={"Add Assignment"}
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Assignment Data"}
            captions={["Id", "title", "Course", "File", "Action"]}
            tableBodyComponent={<AssignmentTableBody data={items} />}
            data={assignments}
          />
        )}
      </Box>
    </Flex>
  );
}

export default Assignments;
