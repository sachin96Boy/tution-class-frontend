import VideoPlayer from "@/components/player/VideoPlayer";
import Spinner from "@/components/spinner/Spinner";
import { getStudentcourseDatabyCourseIdandDataId } from "@/features/course/courseAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CourseContentView() {
  const params = useParams();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const { courseId, dataId } = params;

  const real_enc_id = courseId
    ? decodeURIComponent(courseId.replace(/ /g, "+"))
    : ""; // Fix spaces back to +

  useEffect(() => {
    if (userInfo != null) {
      dispatch(
        getStudentcourseDatabyCourseIdandDataId({
          enc_student_id: userInfo?.student_id,
          enc_course_id: real_enc_id,
          data_id: `${dataId}`,
        })
      );
    }
  }, [dispatch, userInfo]);

  const { loading, isReqData } = useSelector(
    (state: RootState) => state.course
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : isReqData ? (
        <VStack width={"full"} align={"center"} justify={"center"} gap={2}>
          <Box>
            <Heading>{isReqData.title}</Heading>
          </Box>
          <VideoPlayer url={isReqData.Course_video} />
          <Box>
            <Text>{isReqData.course_contnt}</Text>
          </Box>
        </VStack>
      ) : (
        <Box>No Data Available</Box>
      )}
    </>
  );
}

export default CourseContentView;
