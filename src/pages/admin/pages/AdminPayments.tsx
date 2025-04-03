import PaymentsFormComponent from "@/components/admin/forms/PaymentsFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import PaymentTableBody from "@/components/admin/payments/PaymentTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { IListItemProp } from "@/features/config/configAction";
import { Box, Button, Flex } from "@chakra-ui/react";

type IAdminPaymentsProps = {
  studentSelectList: Array<IListItemProp>;
  coursesSelectList: Array<IListItemProp>;
}

function AdminPayments(props: IAdminPaymentsProps) {
  const { studentSelectList, coursesSelectList } = props;

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Payment"}
          modalTitle={"Add Payment Data"}
          formComponent={
            <PaymentsFormComponent studentList={studentSelectList} courseList={coursesSelectList} />
          }
        />
      </Box>
      <Box>
        <OverlayTable title={"Payment Data"} captions={['PaymentId', 'Student', 'Amount', 'Course', 'Paid Date']} tableBodyComponent={<PaymentTableBody data={[]} />} data={[]} />
      </Box>
    </Flex>
  );
}

export default AdminPayments;
