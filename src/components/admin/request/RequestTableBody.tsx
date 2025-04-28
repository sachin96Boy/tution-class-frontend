import {
  grantCourseAccess,
  IreqGetData,
} from "@/features/requests/requestAction";
import { AppDispatch, RootState } from "@/store";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Table,
  Text,
  Wrap,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type IRequestTableBody = {
  data: Array<IreqGetData>;
};

type Istatus = {
  datastatus: string;
};

const RequestTableCell = (RequestDataProps: IreqGetData) => {
  const {
    id,
    Course,
    course_id,
    is_access_granted,
    request_id,
    Student,
    request_status,
    student_id,
  } = RequestDataProps;

  const { coporateInfo } = useSelector((state: RootState) => state.auth);

  const [status, setStatus] = useState("PENDING");

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeCourseStatus = async (props: Istatus) => {
    const { datastatus } = props;


    if (coporateInfo != null) {
      await dispatch(
        grantCourseAccess({
          approve_status: datastatus,
          enc_request_id: request_id,
          user_id: coporateInfo?.user_id,
        })
      );
    }
  };

  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} align={"center"}>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name={Student.full_name} />
            <Avatar.Image src={Student.full_name} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {Student.full_name}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} align={"center"}>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name={Course.title} />
            <Avatar.Image src={Course.course_img_path} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {Course.title}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Badge
          bg={is_access_granted ? "green.400" : "red.600"}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {request_status}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        {is_access_granted ? (
          <Text>Alredy Accessed</Text>
        ) : (
          <Wrap gap={2}>
            <Button
              onClick={() => {
                handleChangeCourseStatus({
                  datastatus: "approved",
                });
              }}
              colorPalette={"blue"}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                handleChangeCourseStatus({
                  datastatus: "rejected",
                });
              }}
              colorPalette={"red"}
            >
              Reject
            </Button>
          </Wrap>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

function RequestTableBody(props: IRequestTableBody) {
  const { data } = props;

  return (
    <Table.Body>
      {data.map((reqItem, index) => {
        return (
          <RequestTableCell
            key={index}
            Course={reqItem.Course}
            Student={reqItem.Student}
            course_id={reqItem.course_id}
            id={reqItem.id}
            is_access_granted={reqItem.is_access_granted}
            request_id={reqItem.request_id}
            request_status={reqItem.request_status}
            student_id={reqItem.student_id}
          />
        );
      })}
    </Table.Body>
  );
}

export default RequestTableBody;
