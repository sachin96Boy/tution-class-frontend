import { Tooltip } from "@/components/ui/tooltip";
import {
  IgetCourseDataProps,
  IgetCourseProps,
} from "@/features/course/courseAction";
import {
  Link,
  Button,
  LinkOverlay,
  Table,
  Text,
  Wrap,
  IconButton,
} from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import React from "react";
import Modalsheet from "../modal/Modalsheet";
import CourseEditFormComponent from "@/components/edit/CourseEditFormComponent";
import CourseDataEditFormComponent from "@/components/edit/CourseDataEditFormComponent";

type ICourseTableBody = {
  data: Array<IgetCourseDataProps>;
};

const CourseDataTableCell = (courseDataProps: IgetCourseDataProps) => {
  const {
    id,
    course_attachment,
    course_month,
    Course_video,
    title,
    enc_course_id,
  } = courseDataProps;
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
          href={Course_video}
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
      <Table.Cell pl="0px">
        <Wrap>
          <Modalsheet
            buttonText={"Edit Course"}
            modalTitle={"Edit Course Data"}
            formComponent={
              <CourseDataEditFormComponent
                courseData={courseDataProps}
                enc_course_id={enc_course_id}
              />
            }
          >
            <IconButton aria-label="Edit" variant={"ghost"}>
              <Tooltip content="Edit">
                <Pencil />
              </Tooltip>
            </IconButton>
          </Modalsheet>
        </Wrap>
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
            Course_video={courseDataItem.Course_video}
            course_contnt={courseDataItem.course_contnt}
            date={courseDataItem.date}
          />
        );
      })}
    </Table.Body>
  );
}

export default CourseDataTablebody;
