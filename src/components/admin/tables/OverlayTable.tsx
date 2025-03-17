import {
  ButtonGroup,
  Card,
  IconButton,
  Pagination,
  Table,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type IoverlayTable = {
  title: string;
  captions: Array<String>;
  tableBodyComponent: React.ReactNode;
  data: Array<any>;
};

function OverlayTable(props: IoverlayTable) {
  const { title, captions, tableBodyComponent, data } = props;

  return (
    <Card.Root overflowX={{ base: "scroll", xl: "hidden" }}>
      <Card.Header>
        <Card.Title>
          <Text>{title}</Text>
        </Card.Title>
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
        <Pagination.Root count={data.length} pageSize={5} page={1}>
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            {/* <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                  {page.value}
                </IconButton>
              )}
            /> */}
            <Pagination.Context>
              {({ pages }) =>
                pages.map((page, index) =>
                  page.type === "page" ? (
                    <Pagination.Item key={index} {...page} />
                  ) : (
                    <Pagination.Ellipsis key={index} index={index} />
                  )
                )
              }
            </Pagination.Context>

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default OverlayTable;
