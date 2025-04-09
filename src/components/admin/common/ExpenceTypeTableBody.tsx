import { IexpenceTypeProps } from "@/features/comon/commonAction";
import { Table, Text } from "@chakra-ui/react";
import React from "react";

type IExpenceTypeTableBody = {
  data: Array<IexpenceTypeProps>;
};

const ExpenceTypeTableCell = (expenceTypeDataProps: IexpenceTypeProps) => {
  const { id, expence_type } = expenceTypeDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">{id}</Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {expence_type}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function ExpenceTypeTableBody(props: IExpenceTypeTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <ExpenceTypeTableCell
            key={index}
            id={item.id}
            expence_type={item.expence_type}
          />
        );
      })}
    </Table.Body>
  );
}

export default ExpenceTypeTableBody;
