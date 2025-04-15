import ExpenceTypeTableBody from "@/components/admin/common/ExpenceTypeTableBody";
import ExpenceTypeForm from "@/components/admin/forms/ExpenceTypeForm";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { IexpenceTypeProps } from "@/features/comon/commonAction";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type IAdminExpencetypeProps = {
  expenceTypes: Array<IexpenceTypeProps>;
};

function AdminExpenceTypes(props: IAdminExpencetypeProps) {
  const { expenceTypes } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IexpenceTypeProps>>(expenceTypes);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = expenceTypes.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [expenceTypes]);

  const handleSearch = (value: string) => {};

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Expene Type"}
          modalTitle={"Add Expence Type"}
          formComponent={<ExpenceTypeForm />}
        >
          <Button colorPalette={"blue"}>Add Expence type</Button>
        </Modalsheet>
      </Box>
      <Box>
        <OverlayTable
          currentPage={currentPage}
          handlePageChange={handleChange}
          title={"ExpenceType Data"}
          captions={["id", "ExpenceType", "Actions"]}
          tableBodyComponent={<ExpenceTypeTableBody data={items} />}
          data={expenceTypes}
          handleSearch={handleSearch}
        />
      </Box>
    </Flex>
  );
}

export default AdminExpenceTypes;
