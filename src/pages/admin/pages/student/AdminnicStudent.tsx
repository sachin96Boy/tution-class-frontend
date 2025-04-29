import Spinner from "@/components/spinner/Spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Tooltip } from "@/components/ui/tooltip";
import { changeNicStatus, getNicData } from "@/features/student/studentAction";
import NicDocumentsView from "@/pages/Nicview";
import { AppDispatch, RootState } from "@/store";
import { Badge, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { RefreshCw } from "lucide-react";
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

  const handleChangeStatus = async () => {
    await dispatch(
      changeNicStatus({
        enc_student_id: real_enc_id,
      })
    );
  };

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : studentNicData ? (
        <>
          <NicDocumentsView userInfo={studentNicData} />
          <Flex gap={2} align={"center"} justify={"space-around"}>
            <Box>Nic Verification Status</Box>
            <Box>
              <Text fontSize="sm" color="gray.400" fontWeight="normal" truncate>
                <Badge
                  bg={
                    studentNicData.is_verified == true
                      ? "green.600"
                      : "yellow.600"
                  }
                  color={"white"}
                  fontSize="16px"
                  p="3px 10px"
                  borderRadius="8px"
                >
                  {studentNicData.is_verified == true ? "Active" : "Pending"}
                </Badge>
              </Text>
            </Box>
            <Box>
              <IconButton
                onClick={handleChangeStatus}
                aria-label="Change Status"
                variant={"ghost"}
              >
                <Tooltip content="Change Status">
                  <RefreshCw />
                </Tooltip>
              </IconButton>
            </Box>
          </Flex>
        </>
      ) : (
        <EmptyState title="No Data Foundf"></EmptyState>
      )}
    </Box>
  );
}

export default AdminnicStudent;
