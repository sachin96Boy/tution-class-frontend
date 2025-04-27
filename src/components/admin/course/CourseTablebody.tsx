import AlertDialog from "@/components/alertDialog/AlertDialog";
import { Tooltip } from "@/components/ui/tooltip";
import {
  changeCourseStatus,
  IgetCourseProps,
} from "@/features/course/courseAction";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  IconButton,
  Table,
  Text,
} from "@chakra-ui/react";
import { LogIn, Pencil, RefreshCw, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Modalsheet from "../modal/Modalsheet";
import CourseEditFormComponent from "@/components/edit/CourseEditFormComponent";
import { IListItemProp } from "@/features/config/configAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

type ICourseTableBody = {
  data: Array<IgetCourseProps>;
};

const CourseTableCell = (courseDataProps: IgetCourseProps) => {
  const { id, course_id, title, year, status, Teacher, Grade, Subject } =
    courseDataProps;

  const dispatch = useDispatch<AppDispatch>();

  const { teachers } = useSelector((state: RootState) => state.teacher);
  const { subjects, grades } = useSelector((state: RootState) => state.common);

  let gradeSelectList: Array<IListItemProp> = grades?.map((grade) => {
    return {
      key: grade.grade_id,
      value: grade.grade,
      image_path: null,
    };
  });
  let subjectSelectList: Array<IListItemProp> = subjects?.map((subject) => {
    return {
      key: subject.subject_id,
      value: subject.subject_name,
      image_path: null,
    };
  });
  let teacherSelectList: Array<IListItemProp> = teachers?.map((teacher) => {
    return {
      key: teacher.teacher_id,
      value: teacher.full_name,
      image_path: teacher.profile_img,
    };
  });

  const encodedId = encodeURIComponent(course_id);

  const handleChangeCourseStatus = async () => {
    await dispatch(
      changeCourseStatus({
        enc_course_id: course_id,
      })
    );
  };

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
          bg={status ? "green.400" : "red.600"}
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
            Visit <LogIn />
          </Button>
        </Link>
        <Modalsheet
          buttonText={"Edit Course"}
          modalTitle={"Edit Course Data"}
          formComponent={
            <CourseEditFormComponent
              data={courseDataProps}
              gradeSelectList={gradeSelectList}
              subjectSelectList={subjectSelectList}
              teacherSelectList={teacherSelectList}
            />
          }
        >
          <IconButton aria-label="Edit" variant={"ghost"}>
            <Tooltip content="Edit">
              <Pencil />
            </Tooltip>
          </IconButton>
        </Modalsheet>
        <IconButton
          onClick={handleChangeCourseStatus}
          aria-label="Change Status"
          variant={"ghost"}
        >
          <Tooltip content="Change Status">
            <RefreshCw />
          </Tooltip>
        </IconButton>
        <AlertDialog handleDelete={() => {}} id="">
          <IconButton colorPalette={"red"} aria-label="Edit" variant={"ghost"}>
            <Tooltip content="Delete">
              <Trash2 />
            </Tooltip>
          </IconButton>
        </AlertDialog>
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
