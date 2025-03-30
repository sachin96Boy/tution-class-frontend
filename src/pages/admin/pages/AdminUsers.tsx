import UserFormComponent from "@/components/admin/forms/UserFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import UsersTableBody from "@/components/admin/users/UsersTableBody";
import Spinner from "@/components/spinner/Spinner";
import { getAllUsers } from "@/features/users/userAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAllUsers(""));
  }, [dispatch]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Create User"}
          modalTitle={"Create User Data"}
          formComponent={<UserFormComponent />}
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            title={"Users Data"}
            captions={["UserId", "Usernme", "Role", "email", "Status"]}
            tableBodyComponent={<UsersTableBody data={users} />}
            data={users}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminUsers;
