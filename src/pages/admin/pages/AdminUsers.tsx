import UserFormComponent from "@/components/admin/forms/UserFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import UsersTableBody from "@/components/admin/users/UsersTableBody";
import Spinner from "@/components/spinner/Spinner";
import { ICoporateUserInfo } from "@/features/auth/authSlice";
import { getAllUsers } from "@/features/users/userAction";
import { applyAdvsearch } from "@/features/users/userSlice";
import { AppDispatch, RootState } from "@/store";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, users } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<ICoporateUserInfo>>([]);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = users.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [users]);

  useEffect(() => {
    dispatch(getAllUsers(""));
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(applyAdvsearch(value));
  };

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Create User"}
          modalTitle={"Create User Data"}
          formComponent={<UserFormComponent />}
        >
          <Button colorPalette={"blue"}>Create User</Button>
        </Modalsheet>
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            title={"Users Data"}
            captions={[
              "UserId",
              "Usernme",
              "Role",
              "email",
              "Status",
              "action",
            ]}
            tableBodyComponent={<UsersTableBody data={items} />}
            data={users}
            currentPage={currentPage}
            handlePageChange={handleChange}
            handleSearch={handleSearch}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminUsers;
