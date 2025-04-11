import { IgetCourseProps } from "@/features/course/courseAction";
import { Avatar, Badge, Button, Flex, Table, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type ICourseTableBody = {
  data: Array<IgetCourseProps>;
};

const CourseTableCell = (courseDataProps: IgetCourseProps) => {
  const { id, course_id, title, year, status, Teacher, Grade, Subject } =
    courseDataProps;

    const encodedId = encodeURIComponent(course_id);

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
            <Avatar.Fallback name={Teacher.full_name} />
            <Avatar.Image src={Teacher.profile_img} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {Teacher.full_name}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {Grade.grade}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {Subject.subject_name}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Badge
          bg={"green.400"}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status ? "Active" : "Inactive"}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {year}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Link to={`/admin/courses/data?id=${encodedId}`}>
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

function CourseTablebody(props: ICourseTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((courseItem, index) => {
        return (
          <CourseTableCell
            key={index}
            id={courseItem.id}
            title={courseItem.title}
            year={courseItem.year}
            status={courseItem.status}
            course_img={courseItem.course_img}
            course_img_path={courseItem.course_img_path}
            subject_id={courseItem.subject_id}
            grade_id={courseItem.grade_id}
            teacher_id={courseItem.teacher_id}
            course_id={courseItem.course_id}
            description={courseItem.description}
            Grade={courseItem.Grade}
            Subject={courseItem.Subject}
            Teacher={courseItem.Teacher}
          />
        );
      })}
    </Table.Body>
  );
}

export default CourseTablebody;
