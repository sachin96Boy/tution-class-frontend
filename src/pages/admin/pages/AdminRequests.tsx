import RequestTableBody from "@/components/admin/request/RequestTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import Spinner from "@/components/spinner/Spinner";
import { getRequestData, IreqGetData } from "@/features/requests/requestAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminRequests() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, requests } = useSelector(
    (state: RootState) => state.request
  );

  useEffect(() => {
    dispatch(getRequestData(""));
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Array<IreqGetData>>(requests);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = requests.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [requests]);

  const handleSearch = (value: string) => {};

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>

      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Request Data"}
            captions={[
              "id",
              "Student",
              "Course",
              "Status",
              "Actions",
            ]}
            tableBodyComponent={<RequestTableBody data={items} />}
            data={requests}
            handleSearch={handleSearch}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminRequests;
