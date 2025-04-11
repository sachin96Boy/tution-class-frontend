import PaymentsFormComponent from "@/components/admin/forms/PaymentsFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import PaymentTableBody from "@/components/admin/payments/PaymentTableBody";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import Spinner from "@/components/spinner/Spinner";
import { getAllPayments, IgetPayment } from "@/features/accounting/accountingAction";
import { IListItemProp } from "@/features/config/configAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type IAdminPaymentsProps = {
  studentSelectList: Array<IListItemProp>;
  coursesSelectList: Array<IListItemProp>;
};

function AdminPayments(props: IAdminPaymentsProps) {
  const { studentSelectList, coursesSelectList } = props;

  const dispatch = useDispatch<AppDispatch>();

  const { loading, payments } = useSelector(
    (state: RootState) => state.account
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IgetPayment>>([]);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = payments.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [payments]);

  useEffect(() => {
    dispatch(getAllPayments(""));
  }, [dispatch]);

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
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Payment Data"}
            captions={["PaymentId", "Student", "Amount", "Course", "Paid Date"]}
            tableBodyComponent={<PaymentTableBody data={items} />}
            data={payments}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminPayments;
