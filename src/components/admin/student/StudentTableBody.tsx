import Logo from "@/components/Logo";
import { QrCode } from "@/components/ui/qr-code";
import { IUserInfo } from "@/features/auth/authSlice";
import { Badge, Box, Button, Table, Text } from "@chakra-ui/react";

type IuserTableBody = {
  data: Array<IUserInfo>;
};

const UserTableCell = (payDataProps: IUserInfo) => {
  const { isVerified, full_name, pay_role, email, id, student_id } =
    payDataProps;

  return (
    <Table.Row p={2}>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {full_name}
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
          {pay_role}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {email}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <QrCode
          colorPalette={"blue"}
          name={`${full_name}.png`}
          value={student_id}
          size={"md"}
        >
          <Logo linkPath="/" boxSize="24" fitType="cover" />
        </QrCode>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text
          fontSize="md"
          color={isVerified ? "green.700" : "yellow.700"}
          fontWeight="black"
        >
          {isVerified ? "Verified" : "Pending"}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function StudentsTableBody(props: IuserTableBody) {
  const { data } = props;

  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <UserTableCell
            key={index}
            id={item.id}
            email={item.email}
            full_name={item.full_name}
            pay_role={item.pay_role}
            student_id={item.student_id}
            isVerified={item.isVerified}
          />
        );
      })}
    </Table.Body>
  );
}

export default StudentsTableBody;
