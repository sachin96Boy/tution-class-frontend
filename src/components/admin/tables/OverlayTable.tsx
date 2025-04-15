import {
  Box,
  ButtonGroup,
  Card,
  Field,
  Flex,
  IconButton,
  Input,
  Pagination,
  Table,
  Text,
} from "@chakra-ui/react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import React, { useState } from "react";

type IoverlayTable = {
  title: string;
  captions: Array<String>;
  tableBodyComponent: React.ReactNode;
  data: Array<any>;
  currentPage: number;
  handleSearch: Function;
  handlePageChange: (details: { page: number }) => void;
};

function OverlayTable(props: IoverlayTable) {
  const {
    title,
    captions,
    tableBodyComponent,
    data,
    currentPage,
    handleSearch,
    handlePageChange,
  } = props;

  const [searchText, setSearchedText] = useState("");

  const handleSearchChange = (e:any) => {
    const value = e.target.value;
    setSearchedText(value);
    handleSearch(value)
  };

  return (
    <Card.Root overflowX={{ base: "scroll", xl: "hidden" }}>
      <Card.Header>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Card.Title>
            <Text>{title}</Text>
          </Card.Title>
          <Box>
            <Field.Root>
              <Input
                colorPalette={"blue"}
                type="text"
                css={{ "--focus-color": "colors.primary_color" }}
                placeholder="Search"
                value={searchText}
                borderWidth={"1px"}
                borderColor={"border_color"}
                rounded={"10px"}
                onChange={handleSearchChange}
              />
            </Field.Root>
          </Box>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Table.Root variant={"outline"} color={"gray.700"}>
          <Table.Header>
            <Table.Row my={"0.8rem"} color={"gray.400"}>
              {captions.map((caption, idx) => {
                return (
                  <Table.ColumnHeader
                    key={idx}
                    ps={idx === 0 ? "0px" : "unset"}
                  >
                    {caption}
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>
          {tableBodyComponent}
        </Table.Root>
        {/* pagination */}
        <Pagination.Root
          count={data.length}
          pageSize={10}
          page={currentPage}
          onPageChange={handlePageChange}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <CircleChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <CircleChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default OverlayTable;
