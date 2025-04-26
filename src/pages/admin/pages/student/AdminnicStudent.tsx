import Spinner from "@/components/spinner/Spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { getNicData } from "@/features/student/studentAction";
import NicDocumentsView from "@/pages/Nicview";
import { AppDispatch, RootState } from "@/store";
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AdminnicStudent() {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { id } = params;

  const real_enc_id = id ? decodeURIComponent(id.replace(/ /g, "+")) : ""; // Fix spaces back to +

  const { loading, studentNicData } = useSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    dispatch(
      getNicData({
        enc_student_id: real_enc_id,
      })
    );
  }, [dispatch]);

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : studentNicData ? (
        <NicDocumentsView userInfo={studentNicData} />
      ) : (
        <EmptyState title="No Data Foundf"></EmptyState>
      )}
    </Box>
  );
}

export default AdminnicStudent;
