import { IgetExpence } from "@/features/accounting/accountingAction";
import { formatter, lkrs } from "@/pages/admin/pages/AdminReports";
import { Avatar, Badge, Flex, Table, Text } from "@chakra-ui/react";
import React from "react";

type IExpenceTableBody = {
  data: Array<IgetExpence>;
};

const ExpenceTableCell = (payDataProps: IgetExpence) => {
  const { Expencetype, Teacher, date, amount, id } = payDataProps;

  const localDate = new Date(date);

  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {Expencetype.expence_type}
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
          {lkrs.format(amount)}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
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
          {formatter.format(localDate)}
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
            Expencetype={expenceItem.Expencetype}
            Teacher={expenceItem.Teacher}
            date={expenceItem.date}
            amount={expenceItem.amount}
            expence_id={expenceItem.expence_id}
            expence_type={expenceItem.expence_type}
            id={expenceItem.id}
            teacher_id={expenceItem.teacher_id}
          />
        );
      })}
    </Table.Body>
  );
}

export default ExpenceTableBody;
