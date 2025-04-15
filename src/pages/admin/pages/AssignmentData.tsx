import AssignmentMarksTablBody from "@/components/admin/assignment/AssignmentMarksTablBody";
import AssignmentMarkSbmitForm from "@/components/admin/forms/AssignmentMarkSbmitForm";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import {
  getAssignmentDataById,
  IAssignmentDataProps,
} from "@/features/assignment/assignmentAction";
import { IListItemProp } from "@/features/config/configAction";
import { getAllStudents } from "@/features/student/studentAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function AssignmentData() {
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const enc_id = params.get("id");
  const real_enc_id = enc_id
    ? decodeURIComponent(enc_id.replace(/ /g, "+"))
    : ""; // Fix spaces back to +

  const { students } = useSelector((state: RootState) => state.student);

  const { loading, assignmentData } = useSelector(
    (state: RootState) => state.assignment
  );

  let studentSelectList: Array<IListItemProp> = students?.map((student) => {
    return {
      key: student.student_id,
      value: student.full_name,
      image_path: null,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] =
    useState<Array<IAssignmentDataProps>>(assignmentData);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = assignmentData.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [assignmentData]);

  useEffect(() => {
    if (enc_id != null) {
      dispatch(
        getAssignmentDataById({
          enc_assignment_id: real_enc_id,
        })
      );
    }

    dispatch(getAllStudents(""));
  }, [enc_id, dispatch]);

  const handleSearch = (value: string) => {};

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Assignment Marks"}
          formComponent={
            <AssignmentMarkSbmitForm
              enc_assignment_id={real_enc_id}
              studentList={studentSelectList}
            />
          }
          modalTitle={"Add Assignment Marks Data"}
        >
          <Button colorPalette={"blue"}>Add Assignment Mark Data</Button>
        </Modalsheet>
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Marks Data"}
            captions={["#", "Student", "Marks"]}
            tableBodyComponent={<AssignmentMarksTablBody data={items} />}
            data={assignmentData}
            handleSearch={handleSearch}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AssignmentData;
