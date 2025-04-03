import PaymentsFormComponent from "@/components/admin/forms/PaymentsFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import PaymentTableBody from "@/components/admin/payments/PaymentTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { IListItemProp } from "@/features/config/configAction";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type IAdminPaymentsProps = {
  studentSelectList: Array<IListItemProp>;
  coursesSelectList: Array<IListItemProp>;
};

function AdminPayments(props: IAdminPaymentsProps) {
  const { studentSelectList, coursesSelectList } = props;

  

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IAdminPaymentsProps>>([]);

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
          buttonText={"Add Payment"}
          modalTitle={"Add Payment Data"}
          formComponent={
            <PaymentsFormComponent
              studentList={studentSelectList}
              courseList={coursesSelectList}
            />
          }
        />
      </Box>
      <Box>
        <OverlayTable
          currentPage={currentPage}
          handlePageChange={handleChange}
          title={"Payment Data"}
          captions={["PaymentId", "Student", "Amount", "Course", "Paid Date"]}
          tableBodyComponent={<PaymentTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminPayments;
