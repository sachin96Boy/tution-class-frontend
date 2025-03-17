import { Badge, Table, Text } from "@chakra-ui/react";
import React from "react";

type Iexpence = {
  expenceId: string;
  expenceType: string;
  teacher: string;
  amount: number;
  date: Date;
};

type IExpenceTableBody = {
  data: Array<Iexpence>;
};

const ExpenceTableCell = (payDataProps: Iexpence) => {
  const { amount, expenceType, date, teacher, expenceId } = payDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {expenceId}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {expenceType}
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
          {amount}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {teacher}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {date.toLocaleDateString()}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function ExpenceTableBody(props: IExpenceTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((expenceItem, index) => {
        return (
          <ExpenceTableCell
            key={index}
            expenceId={expenceItem.expenceId}
            expenceType={expenceItem.expenceType}
            teacher={expenceItem.teacher}
            amount={expenceItem.amount}
            date={expenceItem.date}
          />
        );
      })}
    </Table.Body>
  );
}

export default ExpenceTableBody;
