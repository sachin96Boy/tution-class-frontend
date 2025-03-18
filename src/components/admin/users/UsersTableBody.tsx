import { Badge, Table, Text } from "@chakra-ui/react";


type Iuser = {
  userId: string;
  userName: string;
  email: string;
  role: string;
  verified: boolean;
};

type IuserTableBody = {
  data: Array<Iuser>;
};

const UserTableCell = (payDataProps: Iuser) => {
  const { verified, role, email, userName, userId } = payDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {userId}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {userName}
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
          {role}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {email}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text
          fontSize="sm"
          color={verified ? "green.400" : "yellow.400"}
          fontWeight="normal"
        >
          {verified ? "Verified" : "Pending"}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function UsersTableBody(props: IuserTableBody) {
  const { data } = props;

  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <UserTableCell
            key={index}
            userId={item.userId}
            userName={item.userName}
            email={item.email}
            role={item.role}
            verified={item.verified}
          />
        );
      })}
    </Table.Body>
  );
}

export default UsersTableBody;
