import { Igettimetableyear } from "@/features/timetable/timetableAction";
import { Itimetabledata } from "@/features/timetable/timeTableSlice";
import { Badge, Button, Icon, Table, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineFmdGood } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

type ITiimeTableYearlyTableBody = {
  data: Array<Itimetabledata>;
};

const TimeTableCell = (payDataProps: Itimetabledata) => {
  const { enc_timetable_id, course, day, start_time, end_time } = payDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">
        <Icon>
          <MdOutlineFmdGood />
        </Icon>
      </Table.Cell>
      <Table.Cell>
        <Badge
          bg={"green.400"}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {day}
        </Badge>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {course}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {start_time}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {end_time}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

function TimeTableBody(props: ITiimeTableYearlyTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <TimeTableCell
            key={index}
            id={item.id}
            course={item.course}
            enc_timetable_id={item.enc_timetable_id}
            start_time={item.start_time}
            day={item.day}
            end_time={item.end_time}
          />
        );
      })}
    </Table.Body>
  );
}

export default TimeTableBody;
