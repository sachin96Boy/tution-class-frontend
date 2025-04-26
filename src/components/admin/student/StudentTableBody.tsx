import Logo from "@/components/Logo";
import { QrCode } from "@/components/ui/qr-code";
import { IUserInfo } from "@/features/auth/authSlice";
import {
  Badge,
  Button,
  Flex,
  IconButton,
  Table,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Modalsheet from "../modal/Modalsheet";
import { Tooltip } from "@/components/ui/tooltip";
import { Pencil, RefreshCw, Trash2 } from "lucide-react";
import AlertDialog from "@/components/alertDialog/AlertDialog";
import StudentEditFormComponent from "@/components/edit/StudentEditFormComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { changeStudentStatus } from "@/features/student/studentAction";
import { Link } from "react-router-dom";

type IuserTableBody = {
  data: Array<IUserInfo>;
};

const UserTableCell = (payDataProps: IUserInfo) => {
  const { isVerified, full_name, pay_role, email, id, student_id } =
    payDataProps;

  const dispatch = useDispatch<AppDispatch>();

  const encodedId = encodeURIComponent(student_id);

  const handleChangeStatus = async () => {
    await dispatch(
      changeStudentStatus({
        enc_student_id: student_id,
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
        <Wrap colorPalette={"blue"} gap={2}>
          <Link to={`/admin/students/advance/${encodedId}`}>
            <Button>Advance Data</Button>
          </Link>
          <Link to={`/admin/students/nic/${encodedId}`}>
            <Button>NIC Data</Button>
          </Link>
        </Wrap>
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
            buttonText={"Edit Student"}
            modalTitle={"Edit Student Data"}
            formComponent={<StudentEditFormComponent data={payDataProps} />}
          >
            <IconButton aria-label="Edit" variant={"ghost"}>
              <Tooltip content="Edit">
                <Pencil />
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
            AdditionalStudentDatum={item.AdditionalStudentDatum}
          />
        );
      })}
    </Table.Body>
  );
}

export default StudentsTableBody;
