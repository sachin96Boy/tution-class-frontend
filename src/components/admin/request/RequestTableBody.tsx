import { IreqGetData } from "@/features/requests/requestAction";
import { AppDispatch } from "@/store";
import { Avatar, Badge, Flex, Table, Text } from "@chakra-ui/react";

import React from "react";
import { useDispatch } from "react-redux";

type IRequestTableBody = {
  data: Array<IreqGetData>;
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

  const dispatch = useDispatch<AppDispatch>();

  const encodedId = encodeURIComponent(request_id);

  const handleChangeCourseStatus = async () => {};

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
        <Text>Action</Text>
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
