import Spinner from "@/components/spinner/Spinner";
import { getTeacherById } from "@/features/teacher/teacherAction";
import { AppDispatch, RootState } from "@/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TeacherDetails from "./TeacherDetails";
import { Box } from "@chakra-ui/react";

function TeacherData() {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { id } = params;

  const real_enc_id = id ? decodeURIComponent(id.replace(/ /g, "+")) : ""; // Fix spaces back to +

  useEffect(() => {
    dispatch(
      getTeacherById({
        enc_teacher_id: real_enc_id,
      })
    );
  }, [dispatch]);

  const { loading, selectedTeacher } = useSelector(
    (state: RootState) => state.teacher
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : selectedTeacher != null ? (
        <TeacherDetails
          description={selectedTeacher.description}
          imageUrl1={selectedTeacher.intro_image1}
          imageUrl2={selectedTeacher.intro_image2}
          profileImageUrl={selectedTeacher.profile_img}
          title={selectedTeacher.full_name}
        />
      ) : (
        <Box>Teacher Not Available</Box>
      )}
    </>
  );
}

export default TeacherData;
