import { Badge, List, Table, Text } from "@chakra-ui/react";
import React from "react";

type Ipayment = {
  paymentId: string;
  course: string;
  student: string;
  amount: number;
  paid_date: Date;
};

type IPaymentTableBody = {
  data: Array<Ipayment>;
};

const PaymentTableCell = (payDataProps: Ipayment) => {
  const { amount, course, paid_date, student, paymentId } = payDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {paymentId}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {student}
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
          {course}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {paid_date.toLocaleDateString()}
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
            paymentId={paymentItem.paymentId}
            course={paymentItem.course}
            student={paymentItem.student}
            amount={paymentItem.amount}
            paid_date={paymentItem.paid_date}
          />
        );
      })}
    </Table.Body>
  );
}

export default PaymentTableBody;
