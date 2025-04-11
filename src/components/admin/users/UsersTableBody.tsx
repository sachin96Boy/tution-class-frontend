import { ICoporateUserInfo } from "@/features/auth/authSlice";
import { Badge, Table, Text } from "@chakra-ui/react";

type IuserTableBody = {
  data: Array<ICoporateUserInfo>;
};

const UserTableCell = (payDataProps: ICoporateUserInfo) => {
  const { isVerified, user_role_id, email, userName, user_id, id } =
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
          {user_role_id}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {email}
        </Text>
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

function UsersTableBody(props: IuserTableBody) {
  const { data } = props;

  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <UserTableCell
            key={index}
            id={item.id}
            user_id={item.user_id}
            userName={item.userName}
            email={item.email}
            user_role_id={item.user_role_id}
            isVerified={item.isVerified}
          />
        );
      })}
    </Table.Body>
  );
}

export default UsersTableBody;
