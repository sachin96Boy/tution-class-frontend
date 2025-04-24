import { ICoporateUserInfo } from "@/features/auth/authSlice";
import { Badge, IconButton, Table, Text, Wrap } from "@chakra-ui/react";
import Modalsheet from "../modal/Modalsheet";
import { Tooltip } from "@/components/ui/tooltip";
import { LockKeyholeOpen, Pencil, RefreshCw, Trash2 } from "lucide-react";
import AlertDialog from "@/components/alertDialog/AlertDialog";
import UserEditFormComponent from "@/components/edit/UserEditFormComponent";
import UserPasswordReset from "./UserPasswordReset";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { change_status } from "@/features/users/userAction";

type IuserTableBody = {
  data: Array<ICoporateUserInfo>;
};

const UserTableCell = (payDataProps: ICoporateUserInfo) => {
  const { isVerified, user_role_id, email, userName, user_id, id } =
    payDataProps;

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeStatus = async () => {
    await dispatch(
      change_status({
        user_id: user_id,
      })
    );
  };

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
      <Table.Cell pl="0px">
        <Wrap align={"center"} gap={2}>
          <Modalsheet
            buttonText={"Edit User"}
            modalTitle={"Edit User Data"}
            formComponent={<UserEditFormComponent data={payDataProps} />}
          >
            <IconButton aria-label="Edit" variant={"ghost"}>
              <Tooltip content="Edit">
                <Pencil />
              </Tooltip>
            </IconButton>
          </Modalsheet>
          <Modalsheet
            buttonText={"Reset Pasword"}
            modalTitle={"Reset Password"}
            formComponent={<UserPasswordReset data={payDataProps} />}
          >
            <IconButton aria-label="reset-password" variant={"ghost"}>
              <Tooltip content="Reset Password">
                <LockKeyholeOpen />
              </Tooltip>
            </IconButton>
          </Modalsheet>
          <IconButton
            onClick={handleChangeStatus}
            aria-label="Change Status"
            variant={"ghost"}
          >
            <Tooltip content="Change Status">
              <RefreshCw />
            </Tooltip>
          </IconButton>
          <AlertDialog handleDelete={() => {}} id="">
            <IconButton
              colorPalette={"red"}
              aria-label="Edit"
              variant={"ghost"}
            >
              <Tooltip content="Delete">
                <Trash2 />
              </Tooltip>
            </IconButton>
          </AlertDialog>
        </Wrap>
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
