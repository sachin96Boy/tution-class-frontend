import { IgradeProps, IsubjectProps } from "@/features/comon/commonAction";
import { Badge, Icon, Table, Text } from "@chakra-ui/react";
import React from "react";

type ITiimeTableYearlyTableBody = {
  data: Array<IgradeProps>;
};

const GradeTableCell = (gradeDataProps: IgradeProps) => {
  const { id, grade, grade_type, grade_id } = gradeDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">{id}</Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {grade}
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
          {grade_type}
        </Badge>
      </Table.Cell>
    </Table.Row>
  );
};

function GradeTableBody(props: ITiimeTableYearlyTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <GradeTableCell
            key={index}
            id={item.id}
            grade={item.grade}
            grade_type={item.grade_type}
            grade_id={item.grade_id}
          />
        );
      })}
    </Table.Body>
  );
}

export default GradeTableBody;
