import TimeTableYearPicker from "@/components/admin/forms/TimeTableYearPicker";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TimeTableYearlyTableBody from "@/components/admin/timetable/TimeTableYearlyBody";
import Spinner from "@/components/spinner/Spinner";
import {
  getAllTimeTableData,
  Igettimetableyear,
} from "@/features/timetable/timetableAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminTimeTables() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, timeTables } = useSelector(
    (state: RootState) => state.timetable
  );

  useEffect(() => {
    dispatch(getAllTimeTableData(""));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<Igettimetableyear>>(timeTables);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = timeTables.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [timeTables]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Timetable Year"}
          formComponent={<TimeTableYearPicker />}
          modalTitle={"Add Timetable year Data"}
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Timetable Year Data"}
            captions={["Id", "Year", "Action"]}
            tableBodyComponent={<TimeTableYearlyTableBody data={items} />}
            data={timeTables}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminTimeTables;
