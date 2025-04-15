import StudentsTableBody from "@/components/admin/student/StudentTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";

import Spinner from "@/components/spinner/Spinner";
import { IUserInfo } from "@/features/auth/authSlice";
import { getAllStudents } from "@/features/student/studentAction";
import { getAllUsers } from "@/features/users/userAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Students() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, students } = useSelector(
    (state: RootState) => state.student
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IUserInfo>>([]);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = students.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [students]);

  useEffect(() => {
    dispatch(getAllStudents(""));
  }, [dispatch]);

  const handleSearch = (value: string) => {};

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            title={"Student Data"}
            captions={["UserId", "Fullname", "Role", "email", "QR", "Status"]}
            tableBodyComponent={<StudentsTableBody data={items} />}
            data={students}
            currentPage={currentPage}
            handlePageChange={handleChange}
            handleSearch={handleSearch}
          />
        )}
      </Box>
    </Flex>
  );
}

export default Students;
