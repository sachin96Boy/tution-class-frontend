import { IAssignmentDataProps } from "@/features/assignment/assignmentAction";
import { Avatar, Flex, Icon, Table, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineFmdGood } from "react-icons/md";

type IassignmentMarksTableBody = {
  data: Array<IAssignmentDataProps>;
};

const AssignmentMarksTableCell = (
  assignmentDataProps: IAssignmentDataProps
) => {
  const { Student, assignment_id, id, marks, student_id } = assignmentDataProps;

  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Icon>
          <MdOutlineFmdGood />
        </Icon>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Flex gap={2} align={"center"}>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name={Student.full_name} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {Student.full_name}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {marks}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function AssignmentMarksTablBody(props: IassignmentMarksTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <AssignmentMarksTableCell
            key={index}
            Student={item.Student}
            assignment_id={item.assignment_id}
            marks={item.marks}
            id={item.id}
            student_id={item.student_id}
          />
        );
      })}
    </Table.Body>
  );
}

export default AssignmentMarksTablBody;
