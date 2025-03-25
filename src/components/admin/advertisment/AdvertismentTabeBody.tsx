import { Iadvertisment } from "@/features/advertisment/advertismentSlice";
import { Table, Text } from "@chakra-ui/react";
import React from "react";

type IAdvertismentTableBody = {
  data: Array<Iadvertisment>;
};

const AdvertismentTableCell = (advertismentDataProps: Iadvertisment) => {
  const { advertisment_id, duration, file_name } = advertismentDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {advertisment_id}
        </Text>
      </Table.Cell>

      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal" truncate>
          {duration}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal" truncate>
          {file_name}
        </Text>
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
            advertisment_id={item.advertisment_id}
            duration={item.duration}
            file_name={item.file_name}
            status={item.status}
          />
        );
      })}
    </Table.Body>
  );
}

export default AdvertismentTabeBody;
