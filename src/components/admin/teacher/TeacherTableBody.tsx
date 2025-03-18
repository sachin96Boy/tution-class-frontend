import { Avatar, Flex, Table, Text } from "@chakra-ui/react";
import React from "react";

type Iteacher = {
  teacherId: string;
  fullName: string;
  description: string;
  profileImg: string;
};

type ITeacherTableBody = {
  data: Array<Iteacher>;
};

const TeacherTableCell = (teacherDataProps: Iteacher) => {
  const { teacherId, fullName, description, profileImg } = teacherDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {teacherId}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Flex>
          <Avatar.Root shape="square" size="lg">
            <Avatar.Fallback name={fullName} />
            <Avatar.Image src={profileImg} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {fullName}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell pl="0px">
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
    <Table.Body>
      {data.map((item, index) => {
        return (
          <TeacherTableCell
            key={index}
            fullName={item.fullName}
            description={item.description}
            teacherId={item.teacherId}
            profileImg={item.profileImg}
          />
        );
      })}
    </Table.Body>
  );
}

export default TeacherTableBody;
