import AdvertismentTabeBody from "@/components/admin/advertisment/AdvertismentTabeBody";
import CourseCreateForm from "@/components/admin/forms/CourseCreateForm";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import Spinner from "@/components/spinner/Spinner";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses, IgetCourseProps } from "@/features/course/courseAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminCourses() {
  const dispatch = useDispatch<AppDispatch>();

  const { teachers } = useSelector((state: RootState) => state.teacher);
  const { subjects, grades } = useSelector((state: RootState) => state.common);
  const { loading, courses } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(getAllCourses(""));
  }, []);

  let gradeSelectList: Array<IListItemProp> = grades?.map((grade) => {
    return {
      key: grade.grade_id,
      value: grade.grade,
      image_path: null,
    };
  });
  let subjectSelectList: Array<IListItemProp> = subjects?.map((subject) => {
    return {
      key: subject.subject_id,
      value: subject.subject_name,
      image_path: null,
    };
  });
  let teacherSelectList: Array<IListItemProp> = teachers?.map((teacher) => {
    return {
      key: teacher.teacher_id,
      value: teacher.full_name,
      image_path: teacher.profile_img,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Array<IgetCourseProps>>(courses);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = courses.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [courses]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Create Course"}
          modalTitle={"Add Course Data"}
          formComponent={
            <CourseCreateForm
              gradeSelectList={gradeSelectList}
              subjectSelectList={subjectSelectList}
              teacherSelectList={teacherSelectList}
            />
          }
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Course Data"}
            captions={["id", "title", "teacher"]}
            tableBodyComponent={<AdvertismentTabeBody data={[]} />}
            data={courses}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminCourses;
