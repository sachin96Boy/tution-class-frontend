import { IsubjectProps } from "@/features/comon/commonAction";
import { Table, Text } from "@chakra-ui/react";
import React from "react";

type ITiimeTableYearlyTableBody = {
  data: Array<IsubjectProps>;
};

const SubjectTableCell = (subjectDataProps: IsubjectProps) => {
  const { id, subject_id, subject_name } = subjectDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">{id}</Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {subject_name}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function SubjectTableBody(props: ITiimeTableYearlyTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <SubjectTableCell
            key={index}
            id={item.id}
            subject_id={item.subject_id}
            subject_name={item.subject_name}
          />
        );
      })}
    </Table.Body>
  );
}

export default SubjectTableBody;
