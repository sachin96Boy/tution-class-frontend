import TimeTableYearPicker from "@/components/admin/forms/TimeTableYearPicker";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TimeTableYearlyTableBody from "@/components/admin/timetable/TimeTableYearlyBody";
import Spinner from "@/components/spinner/Spinner";
import { getAllTimeTableData } from "@/features/timetable/timetableAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminTimeTables() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, timeTables } = useSelector(
    (state: RootState) => state.timetable
  );

  useEffect(() => {
    dispatch(getAllTimeTableData(""));
  }, []);

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
            title={"Timetable Year Data"}
            captions={["Id", "Year", "Action"]}
            tableBodyComponent={<TimeTableYearlyTableBody data={timeTables} />}
            data={timeTables}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminTimeTables;
