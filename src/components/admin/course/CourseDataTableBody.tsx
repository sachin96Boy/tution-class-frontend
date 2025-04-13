import {
  IgetCourseDataProps,
  IgetCourseProps,
} from "@/features/course/courseAction";
import { Link, Button, LinkOverlay, Table, Text } from "@chakra-ui/react";
import React from "react";

type ICourseTableBody = {
  data: Array<IgetCourseDataProps>;
};

const CourseDataTableCell = (courseDataProps: IgetCourseDataProps) => {
  const { id, course_attachment, course_month, course_video, title } =
    courseDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {course_month}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {title}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Link
          href={course_video}
          fontSize="sm"
          color="gray.400"
          fontWeight="normal"
        >
          Visit Video
        </Link>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Link
          href={course_attachment}
          fontSize="sm"
          color="gray.400"
          fontWeight="normal"
        >
          Visit Attachment
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

function CourseDataTablebody(props: ICourseTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((courseDataItem, index) => {
        return (
          <CourseDataTableCell
            key={index}
            id={courseDataItem.id}
            title={courseDataItem.title}
            enc_course_id={courseDataItem.enc_course_id}
            course_month={courseDataItem.course_month}
            course_attachment={courseDataItem.course_attachment}
            course_video={courseDataItem.course_video}
            course_content={courseDataItem.course_content}
          />
        );
      })}
    </Table.Body>
  );
}

export default CourseDataTablebody;
