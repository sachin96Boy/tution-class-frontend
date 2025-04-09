import { IAssignmentProps } from "@/features/assignment/assignmentAction";
import {
  Avatar,
  Button,
  Flex,
  Table,
  Text,
  Link as VisitLink,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type IAssignmentTableBody = {
  data: Array<IAssignmentProps>;
};

const AssignmentTableCell = (assignnmentProps: IAssignmentProps) => {
  const { id, Course, assignment_id, course_id, description, file, title } =
    assignnmentProps;

  const encodedId = encodeURIComponent(assignment_id);
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {title}
        </Text>
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
      <Table.Cell pl="0px">
        <VisitLink
          href={file}
          fontSize="sm"
          color="gray.400"
          fontWeight="normal"
        >
          Visit Attachment
        </VisitLink>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Link to={`/admin/assignment/data?id=${encodedId}`}>
          <Button
            variant={"ghost"}
            fontSize="sm"
            color="gray.400"
            fontWeight="normal"
          >
            Visit
          </Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

function AssignmentTableBody(props: IAssignmentTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <AssignmentTableCell
            key={index}
            id={item.id}
            Course={item.Course}
            assignment_id={item.assignment_id}
            course_id={item.course_id}
            description={item.description}
            file={item.file}
            title={item.title}
          />
        );
      })}
    </Table.Body>
  );
}

export default AssignmentTableBody;
