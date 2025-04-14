import AlertDialog from "@/components/alertDialog/AlertDialog";
import { Tooltip } from "@/components/ui/tooltip";
import { Iadvertisment } from "@/features/advertisment/advertismentSlice";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Image,
  Table,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { Pencil, RefreshCw, Trash2 } from "lucide-react";
import React from "react";
import Modalsheet from "../modal/Modalsheet";
import AdvertismentEditFormComponent from "@/components/edit/AdvertismentEditFormComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { changeAdStatus } from "@/features/advertisment/advertismentAction";

type IAdvertismentTableBody = {
  data: Array<Iadvertisment>;
};

const AdvertismentTableCell = (advertismentDataProps: Iadvertisment) => {
  const {
    id,
    advertisment_id,
    duration,
    advertisment_img_path,
    file_name,
    status,
  } = advertismentDataProps;

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeStatus = () => {
    dispatch(
      changeAdStatus({
        advertisment_id: advertisment_id,
      })
    );
  };

  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>

      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal" truncate>
          {duration}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal" truncate>
          <Badge
            bg={status == true ? "green.600" : "red.200"}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {status == true ? "Active" : "Expired"}
          </Badge>
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Box>
          <Image
            src={advertisment_img_path}
            boxSize="80px"
            borderRadius="full"
            fit="cover"
            alt={file_name}
          />
        </Box>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Wrap align={"center"} gap={2}>
          <Modalsheet
            buttonText={"Edit Advertisment"}
            modalTitle={"Edit Advertisment Data"}
            formComponent={
              <AdvertismentEditFormComponent data={advertismentDataProps} />
            }
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

function AdvertismentTabeBody(props: IAdvertismentTableBody) {
  const { data } = props;

  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <AdvertismentTableCell
            key={index}
            id={item.id}
            advertisment_id={item.advertisment_id}
            duration={item.duration}
            file_name={item.file_name}
            status={item.status}
            advertisment_img_path={item.advertisment_img_path}
          />
        );
      })}
    </Table.Body>
  );
}

export default AdvertismentTabeBody;
