import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Button,
  Input,
  InputGroup,
  Table,
  Tabs,
  Card,
  CardHeader,
  CardBody,
  Icon,
  Spinner,
  Badge,
  HStack,
  createListCollection,
} from "@chakra-ui/react";

import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import {
  ArrowDownToLine,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Calendar,
  CalendarCheck2,
  Printer,
  Search,
  Sparkles,
} from "lucide-react";
import { toaster } from "@/components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAllCourses } from "@/features/course/courseAction";
import {
  getDailyAtandance,
  getDailyExpences,
  getDailyPayments,
  getMonthlyAttandance,
  getMonthlyExpences,
  getMonthlyPayments,
} from "@/features/reports/reportAction";

const ReportPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [activeTab, setActiveTab] = useState("payments");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Color mode values
  const cardBg = "white";
  const borderColor = "gray.200";
  const headingColor = "blue.600";
  const totalPositiveColor = "blue.600";
  const totalNegativeColor = "red.600";

  const { courses: corseData } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(""));
  }, []);

  const courses = createListCollection({
    items: corseData,
  });

  const monthsList = [
    { id: 1, month: "January" },
    { id: 2, month: "February" },
    { id: 3, month: "March" },
    { id: 4, month: "April" },
    { id: 5, month: "May" },
    { id: 6, month: "June" },
    { id: 7, month: "July" },
    { id: 8, month: "August" },
    { id: 9, month: "September" },
    { id: 10, month: "October" },
    { id: 11, month: "November" },
    { id: 12, month: "December" },
  ];

  const months = createListCollection({
    items: monthsList,
  });

  const generateReport = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toaster.create({
        title: "Report generated",
        description: "Your report data is ready.",
        type: "success",
        duration: 3000,
      });
    }, 1500);
  };

  const exportReport = (format: string) => {
    toaster.create({
      title: `Exporting to ${format}`,
      description: `Your report will be downloaded as ${format}.`,
      type: "info",
      duration: 2000,
    });
  };

  // Mock report data
  const dailyPayments = [
    {
      id: 1,
      student: "John Doe",
      course: "Web Development",
      amount: 1500,
      date: "2023-05-01",
      method: "Cash",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Data Science",
      amount: 2000,
      date: "2023-05-01",
      method: "Bank Transfer",
    },
    {
      id: 3,
      student: "Mike Johnson",
      course: "Graphic Design",
      amount: 1200,
      date: "2023-05-01",
      method: "Credit Card",
    },
  ];

  const monthlyPayments = [
    {
      id: 1,
      student: "John Doe",
      course: "Web Development",
      amount: 4500,
      month: "April 2023",
      status: "Paid",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Data Science",
      amount: 6000,
      month: "April 2023",
      status: "Paid",
    },
    {
      id: 3,
      student: "Mike Johnson",
      course: "Graphic Design",
      amount: 3600,
      month: "April 2023",
      status: "Partial",
    },
  ];

  const dailyExpenses = [
    {
      id: 1,
      category: "Salaries",
      amount: 5000,
      date: "2023-05-01",
      description: "Teaching staff",
    },
    {
      id: 2,
      category: "Utilities",
      amount: 1200,
      date: "2023-05-01",
      description: "Electricity bill",
    },
    {
      id: 3,
      category: "Supplies",
      amount: 800,
      date: "2023-05-01",
      description: "Stationery",
    },
  ];

  const monthlyExpenses = [
    {
      id: 1,
      category: "Salaries",
      amount: 15000,
      month: "April 2023",
      description: "All staff",
    },
    {
      id: 2,
      category: "Rent",
      amount: 10000,
      month: "April 2023",
      description: "Building rent",
    },
    {
      id: 3,
      category: "Marketing",
      amount: 5000,
      month: "April 2023",
      description: "Online ads",
    },
  ];

  const dailyAttendance = [
    {
      id: 1,
      student: "John Doe",
      course: "Web Development",
      status: "Present",
      date: "2023-05-01",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Web Development",
      status: "Absent",
      date: "2023-05-01",
    },
    {
      id: 3,
      student: "Mike Johnson",
      course: "Data Science",
      status: "Present",
      date: "2023-05-01",
    },
  ];

  const monthlyAttendance = [
    {
      id: 1,
      student: "John Doe",
      course: "Web Development",
      present: 20,
      absent: 2,
      month: "April 2023",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Web Development",
      present: 18,
      absent: 4,
      month: "April 2023",
    },
    {
      id: 3,
      student: "Mike Johnson",
      course: "Data Science",
      present: 22,
      absent: 0,
      month: "April 2023",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge colorPalette="green">Paid</Badge>;
      case "Partial":
        return <Badge colorPalette="yellow">Partial</Badge>;
      case "Present":
        return <Badge colorPalette="green">Present</Badge>;
      case "Absent":
        return <Badge colorPalette="red">Absent</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const generateDailyPaymentData = async () => {
    await dispatch(
      getDailyPayments({
        course_id: selectedCourse,
        start_date: dateRange[0].startDate.toLocaleDateString(),
        end_date: dateRange[0].endDate.toLocaleDateString(),
      })
    );
  };
  const generateDailyExpencesData = async () => {
    await dispatch(
      getDailyExpences({
        start_date: dateRange[0].startDate.toLocaleDateString(),
        end_date: dateRange[0].endDate.toLocaleDateString(),
      })
    );
  };
  const generateDailyAttandance = async () => {
    await dispatch(
      getDailyAtandance({
        course_id: selectedCourse,
        date: dateRange[0].startDate.toLocaleDateString(),
      })
    );
  };
  const generateMonthlyPaymentData = async () => {
    await dispatch(
      getMonthlyPayments({
        course_id: selectedCourse,
        month: selectedMonth,
      })
    );
  };
  const generateMonthlyExpencesData = async () => {
    await dispatch(
      getMonthlyExpences({
        month: selectedMonth,
      })
    );
  };
  const generateMonthlyAttandance = async () => {
    await dispatch(
      getMonthlyAttandance({
        course_id: selectedCourse,
        month: selectedMonth,
      })
    );
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl" color={headingColor}>
          Institute Reports
        </Heading>
        <HStack gap={4}>
          <Button
            colorPalette="blue"
            variant="outline"
            onClick={() => exportReport("CSV")}
          >
            <ArrowDownToLine /> Export CSV
          </Button>
          <Button colorPalette="blue" onClick={() => exportReport("PDF")}>
            <Printer /> Print
          </Button>
        </HStack>
      </Flex>

      <Tabs.Root
        variant="enclosed"
        value={activeTab}
        onValueChange={(e) => setActiveTab(e.value)}
      >
        <Tabs.List>
          <Tabs.Trigger value="payments">
            <BanknoteArrowUp />
            Payments
          </Tabs.Trigger>
          <Tabs.Trigger value="expenses">
            <BanknoteArrowDown />
            Expenses
          </Tabs.Trigger>
          <Tabs.Trigger value="attandance">
            <CalendarCheck2 />
            Attendance
          </Tabs.Trigger>
        </Tabs.List>

        {/* Payments Tab */}
        <Tabs.Content value={"payments"}>
          <Tabs.Root
            variant="outline"
            defaultValue={"daily"}
            colorPalette="blue"
          >
            <Tabs.List>
              <Tabs.Trigger value="daily">Daily Payments</Tabs.Trigger>
              <Tabs.Trigger value="monthly">Monthly Payments</Tabs.Trigger>
            </Tabs.List>

            {/* Daily Payments */}
            <Tabs.Content value="daily" p={0}>
              <Card.Root
                mb={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Card.Header>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Daily Payment Report</Heading>
                    <Text fontSize="sm" color="gray.500">
                      <Icon as={Calendar} mr={1} />
                      {new Date().toLocaleDateString()}
                    </Text>
                  </Flex>
                </Card.Header>
                <Card.Body>
                  <Flex
                    mb={6}
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                  >
                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">
                        Date Range
                      </Text>
                      <DateRangePicker
                        ranges={dateRange}
                        onChange={(item) => {
                          if (
                            item.selection.startDate &&
                            item.selection.endDate
                          ) {
                            setDateRange([
                              {
                                startDate: item.selection.startDate,
                                endDate: item.selection.endDate,
                                key: "selection",
                              },
                            ]);
                          }
                        }}
                        moveRangeOnFirstSelection={false}
                        direction="horizontal"
                      />
                    </Box>
                    <Box flex={1}>
                      <Select.Root
                        collection={courses}
                        value={[selectedCourse]}
                        onValueChange={(e) =>
                          setSelectedCourse(e.value[0] || "")
                        }
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Course</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select Course" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {courses.items.map((course, index) => (
                              <Select.Item item={course.course_id} key={index}>
                                {course.title}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                  </Flex>
                  <Button
                    colorPalette="blue"
                    onClick={generateDailyPaymentData}
                    loading={isLoading}
                    loadingText="Generating..."
                  >
                    <Sparkles /> Generate Report
                  </Button>
                </Card.Body>
              </Card.Root>

              {isLoading ? (
                <Flex justify="center" py={12}>
                  <Spinner size="xl" />
                </Flex>
              ) : (
                <Card.Root
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Card.Header>
                    <Flex justify="space-between" align="center">
                      <Heading size="md">Daily Payment Details</Heading>
                      <Text fontWeight="bold" color={totalPositiveColor}>
                        Total: Rs
                        {dailyPayments.reduce(
                          (sum, item) => sum + item.amount,
                          0
                        )}
                      </Text>
                    </Flex>
                  </Card.Header>
                  <Card.Body>
                    <Table.Root variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Student</Table.ColumnHeader>
                          <Table.ColumnHeader>Course</Table.ColumnHeader>
                          <Table.ColumnHeader>Amount</Table.ColumnHeader>
                          <Table.ColumnHeader>Date</Table.ColumnHeader>
                          <Table.ColumnHeader>Method</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {dailyPayments.map((payment) => (
                          <Table.Row key={payment.id}>
                            <Table.Cell>{payment.student}</Table.Cell>
                            <Table.Cell>{payment.course}</Table.Cell>
                            <Table.Cell>₹{payment.amount}</Table.Cell>
                            <Table.Cell>{payment.date}</Table.Cell>
                            <Table.Cell>{payment.method}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Card.Body>
                </Card.Root>
              )}
            </Tabs.Content>

            {/* Monthly Payments */}
            <Tabs.Content value="monthly" p={0}>
              <Card.Root
                mb={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Card.Header>
                  <Heading size="md">Monthly Payment Report</Heading>
                </Card.Header>
                <Card.Body>
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                    mb={6}
                  >
                    <Box flex={1}>
                      <Select.Root
                        collection={months}
                        value={[selectedMonth]}
                        onValueChange={(e) => setSelectedMonth(e.value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Month</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select month" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {months.items.map((month, index) => (
                              <Select.Item item={month.id} key={index}>
                                {month.month}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                    <Box flex={1}>
                      <Select.Root
                        collection={courses}
                        value={[selectedCourse]}
                        onValueChange={(e) => setSelectedCourse(e.value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Course</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select course" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {courses.items.map((course, index) => (
                              <Select.Item item={course.course_id} key={index}>
                                {course.title}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                  </Flex>
                  <Button
                    colorPalette="blue"
                    onClick={generateMonthlyPaymentData}
                    loading={isLoading}
                    loadingText="Generating..."
                  >
                    <Sparkles /> Generate Report
                  </Button>
                </Card.Body>
              </Card.Root>

              {isLoading ? (
                <Flex justify="center" py={12}>
                  <Spinner size="xl" />
                </Flex>
              ) : (
                <Card.Root
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Card.Header>
                    <Flex justify="space-between" align="center">
                      <Heading size="md">Monthly Payment Details</Heading>
                      <Text fontWeight="bold" color={totalPositiveColor}>
                        Total: Rs
                        {monthlyPayments.reduce(
                          (sum, item) => sum + item.amount,
                          0
                        )}
                      </Text>
                    </Flex>
                  </Card.Header>
                  <Card.Body>
                    <Table.Root variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Student</Table.ColumnHeader>
                          <Table.ColumnHeader>Course</Table.ColumnHeader>
                          <Table.ColumnHeader>Amount</Table.ColumnHeader>
                          <Table.ColumnHeader>Month</Table.ColumnHeader>
                          <Table.ColumnHeader>Status</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {monthlyPayments.map((payment) => (
                          <Table.Row key={payment.id}>
                            <Table.Cell>{payment.student}</Table.Cell>
                            <Table.Cell>{payment.course}</Table.Cell>
                            <Table.Cell>₹{payment.amount}</Table.Cell>
                            <Table.Cell>{payment.month}</Table.Cell>
                            <Table.Cell>
                              {getStatusBadge(payment.status)}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Card.Body>
                </Card.Root>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Tabs.Content>

        {/* Expenses Tab */}
        <Tabs.Content value={"expenses"}>
          <Tabs.Root
            defaultValue={"daily"}
            variant="outline"
            colorPalette="blue"
          >
            <Tabs.List>
              <Tabs.Trigger value="daily">Daily Expenses</Tabs.Trigger>
              <Tabs.Trigger value="monthly">Monthly Expenses</Tabs.Trigger>
            </Tabs.List>

            {/* Daily Expenses */}
            <Tabs.Content value="daily" p={0}>
              <Card.Root
                mb={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Card.Header>
                  <Heading size="md">Daily Expense Report</Heading>
                </Card.Header>
                <Card.Body>
                  <Flex
                    mb={6}
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                  >
                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">
                        Date Range
                      </Text>
                      <DateRangePicker
                        ranges={dateRange}
                        onChange={(item) => {
                          if (
                            item.selection.startDate &&
                            item.selection.endDate
                          ) {
                            setDateRange([
                              {
                                startDate: item.selection.startDate,
                                endDate: item.selection.endDate,
                                key: "selection",
                              },
                            ]);
                          }
                        }}
                        moveRangeOnFirstSelection={false}
                        direction="horizontal"
                      />
                    </Box>
                  </Flex>
                  <Button
                    colorPalette="blue"
                    onClick={generateDailyExpencesData}
                    loading={isLoading}
                    loadingText="Generating..."
                  >
                    <Sparkles /> Generate Report
                  </Button>
                </Card.Body>
              </Card.Root>

              {isLoading ? (
                <Flex justify="center" py={12}>
                  <Spinner size="xl" />
                </Flex>
              ) : (
                <Card.Root
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Card.Header>
                    <Flex justify="space-between" align="center">
                      <Heading size="md">Daily Expense Details</Heading>
                      <Text fontWeight="bold" color={totalNegativeColor}>
                        Total: Rs
                        {dailyExpenses.reduce(
                          (sum, item) => sum + item.amount,
                          0
                        )}
                      </Text>
                    </Flex>
                  </Card.Header>
                  <Card.Body>
                    <Table.Root variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Category</Table.ColumnHeader>
                          <Table.ColumnHeader>Amount</Table.ColumnHeader>
                          <Table.ColumnHeader>Date</Table.ColumnHeader>
                          <Table.ColumnHeader>Description</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {dailyExpenses.map((expense, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{expense.category}</Table.Cell>
                            <Table.Cell>₹{expense.amount}</Table.Cell>
                            <Table.Cell>{expense.date}</Table.Cell>
                            <Table.Cell>{expense.description}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Card.Body>
                </Card.Root>
              )}
            </Tabs.Content>

            {/* Monthly Expenses */}
            <Tabs.Content value="monthly" p={0}>
              <Card.Root
                mb={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <CardHeader>
                  <Heading size="md">Monthly Expense Report</Heading>
                </CardHeader>
                <CardBody>
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                    mb={6}
                  >
                    <Box flex={1}>
                      <Select.Root
                        collection={months}
                        value={[selectedMonth]}
                        onValueChange={(e) => setSelectedMonth(e.value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>month</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select month" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {months.items.map((month, index) => (
                              <Select.Item item={month.id} key={index}>
                                {month.month}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                  </Flex>
                  <Button
                    colorPalette="blue"
                    onClick={generateMonthlyExpencesData}
                    loading={isLoading}
                    loadingText="Generating..."
                  >
                    <Sparkles /> Generate Report
                  </Button>
                </CardBody>
              </Card.Root>

              {isLoading ? (
                <Flex justify="center" py={12}>
                  <Spinner size="xl" />
                </Flex>
              ) : (
                <Card.Root
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Card.Header>
                    <Flex justify="space-between" align="center">
                      <Heading size="md">Monthly Expense Details</Heading>
                      <Text fontWeight="bold" color={totalNegativeColor}>
                        Total: Rs
                        {monthlyExpenses.reduce(
                          (sum, item) => sum + item.amount,
                          0
                        )}
                      </Text>
                    </Flex>
                  </Card.Header>
                  <Card.Body>
                    <Table.Root variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Category</Table.ColumnHeader>
                          <Table.ColumnHeader>Amount</Table.ColumnHeader>
                          <Table.ColumnHeader>Month</Table.ColumnHeader>
                          <Table.ColumnHeader>Description</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {monthlyExpenses.map((expense) => (
                          <Table.Row key={expense.id}>
                            <Table.Cell>{expense.category}</Table.Cell>
                            <Table.Cell>₹{expense.amount}</Table.Cell>
                            <Table.Cell>{expense.month}</Table.Cell>
                            <Table.Cell>{expense.description}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Card.Body>
                </Card.Root>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Tabs.Content>

        {/* Attendance Tab */}
        <Tabs.Content value={"attandance"}>
          <Tabs.Root
            defaultValue={"daily"}
            variant="outline"
            colorPalette="blue"
          >
            <Tabs.List>
              <Tabs.Trigger value="daily">Daily Attendance</Tabs.Trigger>
              <Tabs.Trigger value="monthly">Monthly Attendance</Tabs.Trigger>
            </Tabs.List>

            {/* Daily Attendance */}
            <Tabs.Content value="daily" p={0}>
              <Card.Root
                mb={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Card.Header>
                  <Heading size="md">Daily Attendance Report</Heading>
                </Card.Header>
                <Card.Body>
                  <Flex
                    mb={6}
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                  >
                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">
                        Date
                      </Text>
                      <Input
                        type="date"
                        value={
                          dateRange[0].startDate.toISOString().split("T")[0]
                        }
                        onChange={(e) =>
                          setDateRange([
                            {
                              startDate: new Date(e.target.value),
                              endDate: new Date(e.target.value),
                              key: "selection",
                            },
                          ])
                        }
                      />
                    </Box>
                    <Box flex={1}>
                      <Select.Root
                        collection={courses}
                        value={[selectedCourse]}
                        onValueChange={(e) => setSelectedCourse(e.value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Course</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select course" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {courses.items.map((course, index) => (
                              <Select.Item item={course.course_id} key={index}>
                                {course.title}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                  </Flex>
                  <Button
                    colorPalette="blue"
                    onClick={generateDailyAttandance}
                    loading={isLoading}
                    loadingText="Generating..."
                  >
                    <Sparkles /> Generate Report
                  </Button>
                </Card.Body>
              </Card.Root>

              {isLoading ? (
                <Flex justify="center" py={12}>
                  <Spinner size="xl" />
                </Flex>
              ) : (
                <Card.Root
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Card.Header>
                    <Heading size="md">Daily Attendance Details</Heading>
                  </Card.Header>
                  <Card.Body>
                    <Flex mb={4} justify="space-between">
                      <Text>
                        <strong>Date:</strong>{" "}
                        {dateRange[0].startDate.toLocaleDateString()}
                      </Text>
                      <Text>
                        <strong>Course:</strong>{" "}
                        {selectedCourse || "All Courses"}
                      </Text>
                    </Flex>
                    <Table.Root variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Student</Table.ColumnHeader>
                          <Table.ColumnHeader>Course</Table.ColumnHeader>
                          <Table.ColumnHeader>Status</Table.ColumnHeader>
                          <Table.ColumnHeader>Date</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {dailyAttendance.map((record) => (
                          <Table.Row key={record.id}>
                            <Table.Cell>{record.student}</Table.Cell>
                            <Table.Cell>{record.course}</Table.Cell>
                            <Table.Cell>
                              {getStatusBadge(record.status)}
                            </Table.Cell>
                            <Table.Cell>{record.date}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Card.Body>
                </Card.Root>
              )}
            </Tabs.Content>

            {/* Monthly Attendance */}
            <Tabs.Content value="monthly" p={0}>
              <Card.Root
                mb={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Card.Header>
                  <Heading size="md">Monthly Attendance Report</Heading>
                </Card.Header>
                <Card.Body>
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={4}
                    mb={6}
                  >
                    <Box flex={1}>
                      <Select.Root
                        collection={months}
                        value={[selectedMonth]}
                        onValueChange={(e) => setSelectedMonth(e.value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Month</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select month" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {months.items.map((month, index) => (
                              <Select.Item item={month.id} key={index}>
                                {month.month}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                    <Box flex={1}>
                      <Select.Root
                        collection={courses}
                        value={[selectedCourse]}
                        onValueChange={(e) => setSelectedCourse(e.value[0])}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Course</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select course" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {courses.items.map((course, index) => (
                              <Select.Item item={course.course_id} key={index}>
                                {course.title}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                  </Flex>
                  <Button
                    colorPalette="blue"
                    onClick={generateMonthlyAttandance}
                    loading={isLoading}
                    loadingText="Generating..."
                  >
                    <Sparkles /> Generate Report
                  </Button>
                </Card.Body>
              </Card.Root>

              {isLoading ? (
                <Flex justify="center" py={12}>
                  <Spinner size="xl" />
                </Flex>
              ) : (
                <Card.Root
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Card.Header>
                    <Heading size="md">Monthly Attendance Summary</Heading>
                  </Card.Header>
                  <Card.Body>
                    <Flex mb={4} justify="space-between">
                      <Text>
                        <strong>Month:</strong> {selectedMonth || "All Months"}
                      </Text>
                      <Text>
                        <strong>Course:</strong>{" "}
                        {selectedCourse || "All Courses"}
                      </Text>
                    </Flex>
                    <Table.Root variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Student</Table.ColumnHeader>
                          <Table.ColumnHeader>Course</Table.ColumnHeader>
                          <Table.ColumnHeader>Present</Table.ColumnHeader>
                          <Table.ColumnHeader>Absent</Table.ColumnHeader>
                          <Table.ColumnHeader>Attendance %</Table.ColumnHeader>
                          <Table.ColumnHeader>Month</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {monthlyAttendance.map((record) => {
                          const total = record.present + record.absent;
                          const percentage =
                            total > 0
                              ? Math.round((record.present / total) * 100)
                              : 0;
                          return (
                            <Table.Row key={record.id}>
                              <Table.Cell>{record.student}</Table.Cell>
                              <Table.Cell>{record.course}</Table.Cell>
                              <Table.Cell>{record.present}</Table.Cell>
                              <Table.Cell>{record.absent}</Table.Cell>
                              <Table.Cell>
                                <Badge
                                  colorPalette={
                                    percentage > 80
                                      ? "green"
                                      : percentage > 60
                                      ? "yellow"
                                      : "red"
                                  }
                                >
                                  {percentage}%
                                </Badge>
                              </Table.Cell>
                              <Table.Cell>{record.month}</Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table.Root>
                  </Card.Body>
                </Card.Root>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default ReportPage;
