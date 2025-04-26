import Spinner from "@/components/spinner/Spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { getAdditionalStudentData } from "@/features/student/studentAction";
import ProfileView from "@/pages/ProfileView";
import { AppDispatch, RootState } from "@/store";
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AdminAdvStudent() {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { id } = params;

  const real_enc_id = id ? decodeURIComponent(id.replace(/ /g, "+")) : ""; // Fix spaces back to +

  const { loading, additionalStudentData } = useSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    dispatch(
      getAdditionalStudentData({
        enc_student_id: real_enc_id,
      })
    );
  }, [dispatch]);

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : additionalStudentData ? (
        <ProfileView userInfo={additionalStudentData} />
      ) : (
        <EmptyState title="No Data Found"></EmptyState>
      )}
    </Box>
  );
}

export default AdminAdvStudent;
