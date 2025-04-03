import AdvertismentTabeBody from "@/components/admin/advertisment/AdvertismentTabeBody";
import AdvertismentFormComponent from "@/components/admin/forms/AdvertismentFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import Spinner from "@/components/spinner/Spinner";
import { getAllAdvertisments } from "@/features/advertisment/advertismentAction";
import { Iadvertisment } from "@/features/advertisment/advertismentSlice";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminAdvertiments() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, advertisments } = useSelector(
    (state: RootState) => state.advertisment
  );

  useEffect(() => {
    dispatch(getAllAdvertisments(""));
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Array<Iadvertisment>>(advertisments);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = advertisments.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [advertisments]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Create Advertisment"}
          modalTitle={"Add Advertisment Data"}
          formComponent={<AdvertismentFormComponent />}
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Advertisment Data"}
            captions={["AdvertismentId", "Amount", "file"]}
            tableBodyComponent={<AdvertismentTabeBody data={advertisments} />}
            data={advertisments}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminAdvertiments;
