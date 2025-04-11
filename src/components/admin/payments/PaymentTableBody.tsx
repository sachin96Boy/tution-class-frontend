import { IgetPayment } from "@/features/accounting/accountingAction";
import { Avatar, Badge, Flex, List, Table, Text } from "@chakra-ui/react";
import React from "react";

type IPaymentTableBody = {
  data: Array<IgetPayment>;
};

const PaymentTableCell = (payDataProps: IgetPayment) => {
  const { Course, Student, paid_date, id, paid_amount } = payDataProps;
  const localDate = new Date(paid_date);
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Flex gap={2} align={"center"}>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name={Student.full_name} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {Student.full_name}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Badge
          bg={"green.400"}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          RS {paid_amount}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Flex gap={2} align={"center"}>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name={Course.title} />
            <Avatar.Image src={Course.course_img_path} />
          </Avatar.Root>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {Course.title}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {localDate.toLocaleDateString()}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function PaymentTableBody(props: IPaymentTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((paymentItem, index) => {
        return (
          <PaymentTableCell
            key={index}
            Course={paymentItem.Course}
            Student={paymentItem.Student}
            course_id={paymentItem.course_id}
            paid_date={paymentItem.paid_date}
            id={paymentItem.id}
            paid_amount={paymentItem.paid_amount}
            payment_id={paymentItem.payment_id}
            student_id={paymentItem.payment_id}
          />
        );
      })}
    </Table.Body>
  );
}

export default PaymentTableBody;
