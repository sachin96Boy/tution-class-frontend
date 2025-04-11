import { Igettimetableyear } from "@/features/timetable/timetableAction";
import { Badge, Button, Table, Text } from "@chakra-ui/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

type ITiimeTableYearlyTableBody = {
  data: Array<Igettimetableyear>;
};

const TimeTableYearlyTableCell = (payDataProps: Igettimetableyear) => {
  const { id, time_table_id, year } = payDataProps;

  const encodedId = encodeURIComponent(time_table_id);
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {id}
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
          {year}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Link to={`/admin/time-table/data?id=${encodedId}`}>
          <Button
            variant={"ghost"}
            fontSize="sm"
            color="gray.400"
            fontWeight="normal"
          >
            Visit
          </Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

function TimeTableYearlyTableBody(props: ITiimeTableYearlyTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <TimeTableYearlyTableCell
            key={index}
            id={item.id}
            time_table_id={item.time_table_id}
            year={item.year}
          />
        );
      })}
    </Table.Body>
  );
}

export default TimeTableYearlyTableBody;
