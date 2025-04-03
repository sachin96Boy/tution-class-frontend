import ExpenceTableBody from "@/components/admin/expence/ExpenceTableBody";
import ExpenceFormComponent from "@/components/admin/forms/ExpenceFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { IListItemProp } from "@/features/config/configAction";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect,  useState } from "react";

type IAdminExpencesProps = {
  expenceTypeList: Array<IListItemProp>;
  teacherList: Array<IListItemProp>;
};

function AdminExpences(props: IAdminExpencesProps) {
  const { expenceTypeList, teacherList } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Array<IAdminExpencesProps>>([]);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = [].slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, []);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Expences"}
          formComponent={
            <ExpenceFormComponent
              expenceTypeList={expenceTypeList}
              teacherList={teacherList}
            />
          }
          modalTitle={"Add Expence Data"}
        />
      </Box>
      <Box>
        <OverlayTable
          currentPage={currentPage}
          handlePageChange={handleChange}
          title={"Expences Data"}
          captions={["ExpencesId", "Type", "Amount", "Teacher", "Date"]}
          tableBodyComponent={<ExpenceTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminExpences;
