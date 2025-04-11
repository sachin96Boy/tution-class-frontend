import GradeTableBody from "@/components/admin/common/GradeTaleBoody";
import GradeForm from "@/components/admin/forms/GradeInfoForm";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { IgradeProps } from "@/features/comon/commonAction";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type IAdminGradeProps = {
  grades: Array<IgradeProps>;
};

function AdminGrade(props: IAdminGradeProps) {
  const { grades } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IgradeProps>>(grades);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = grades.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(()=>{
    handleChange({
      page: 1
    })
  },[grades]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Grade"}
          modalTitle={"Add Data on Grade"}
          formComponent={<GradeForm />}
        />
      </Box>
      <Box>
        <OverlayTable
          title={"Grade Data"}
          captions={["id", "grade", "gradeType"]}
          currentPage={currentPage}
          handlePageChange= {handleChange}
          tableBodyComponent={<GradeTableBody data={items} />}
          data={grades}
        />
      </Box>
    </Flex>
  );
}

export default AdminGrade;
