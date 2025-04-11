import { Iadvertisment } from "@/features/advertisment/advertismentSlice";
import { Badge, Box, Image, Table, Text } from "@chakra-ui/react";
import React from "react";

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
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
        </Text>
      </Table.Cell>

      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal" truncate>
          RS {duration}
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
