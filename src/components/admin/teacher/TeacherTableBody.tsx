import { IteacherGetProps } from "@/features/teacher/teacherAction";
import { Avatar, Box, Flex, Table, Text } from "@chakra-ui/react";
import React from "react";

type ITeacherTableBody = {
  data: Array<IteacherGetProps>;
};

const TeacherTableCell = (teacherDataProps: IteacherGetProps) => {
  const { id, full_name, description, profile_img } = teacherDataProps;

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
      <Table.Cell>
        <Text fontSize="sm" color="gray.400" fontWeight="normal" truncate>
          {description}
        </Text>
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
