import SubjectTableBody from "@/components/admin/common/SubjectTableBody";
import SubjectForm from "@/components/admin/forms/SubjectForm";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { IsubjectProps } from "@/features/comon/commonAction";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type IAdminSubjectProps = {
  subjects: Array<IsubjectProps>;
};

function AdminSubject(props: IAdminSubjectProps) {
  const { subjects } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IsubjectProps>>(subjects);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = subjects.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [subjects]);

  const handleSearch = (value: String) => {};

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Subject"}
          modalTitle={"Add Subject"}
          formComponent={<SubjectForm />}
        >
          <Button colorPalette={"blue"}>Add Subject</Button>
        </Modalsheet>
      </Box>
      <Box>
        <OverlayTable
          currentPage={currentPage}
          handlePageChange={handleChange}
          title={"Subject Data"}
          captions={["id", "subject"]}
          tableBodyComponent={<SubjectTableBody data={items} />}
          data={subjects}
          handleSearch={handleSearch}
        />
      </Box>
    </Flex>
  );
}

export default AdminSubject;
