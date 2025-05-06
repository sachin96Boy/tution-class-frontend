import { IteacherGetProps } from "@/features/teacher/teacherAction";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Table,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import Modalsheet from "../modal/Modalsheet";
import { Tooltip } from "@/components/ui/tooltip";
import { Pencil, RefreshCw, Trash2 } from "lucide-react";
import AlertDialog from "@/components/alertDialog/AlertDialog";
import TeacherEditFormComponent from "@/components/edit/TeacherEditFormComponent";

type ITeacherTableBody = {
  data: Array<IteacherGetProps>;
};

const TeacherTableCell = (teacherDataProps: IteacherGetProps) => {
  const {
    id,
    full_name,
    description,
    profile_img,
    intro_image1,
    intro_image2,
  } = teacherDataProps;

  return (
    <Table.Row>
      <Table.Cell>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} align={"center"}>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name={full_name} />
            <Avatar.Image src={profile_img} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {full_name}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell pl={"0px"}>
        <Text
          width={"200px"}
          fontSize="sm"
          color="gray.400"
          fontWeight="normal"
          truncate
        >
          {description}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Wrap align={"center"} gap={2}>
          <Modalsheet
            buttonText={"Edit Teacher"}
            modalTitle={"Edit Teacher Data"}
            formComponent={<TeacherEditFormComponent data={teacherDataProps} />}
          >
            <IconButton aria-label="Edit" variant={"ghost"}>
              <Tooltip content="Edit">
                <Pencil />
              </Tooltip>
            </IconButton>
          </Modalsheet>
          <AlertDialog handleDelete={() => {}} id="">
            <IconButton
              colorPalette={"red"}
              aria-label="Edit"
              variant={"ghost"}
            >
              <Tooltip content="Delete">
                <Trash2 />
              </Tooltip>
            </IconButton>
          </AlertDialog>
        </Wrap>
      </Table.Cell>
    </Table.Row>
  );
};

function TeacherTableBody(props: ITeacherTableBody) {
  const { data } = props;
  return (
    <>
      {data.length > 0 ? (
        <Table.Body>
          {data.map((item, index) => {
            return (
              <TeacherTableCell
                key={index}
                id={item.id}
                full_name={item.full_name}
                description={item.description}
                teacher_id={item.teacher_id}
                profile_img={item.profile_img}
                intro_image1=""
                intro_image2=""
              />
            );
          })}
        </Table.Body>
      ) : (
        <Table.Body></Table.Body>
      )}
    </>
  );
}

export default TeacherTableBody;
