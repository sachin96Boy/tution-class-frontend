import { IexpenceTypeProps } from "@/features/comon/commonAction";
import { IconButton, Table, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import Modalsheet from "../modal/Modalsheet";
import { Pencil, Trash2 } from "lucide-react";
import AlertDialog from "@/components/alertDialog/AlertDialog";
import { Tooltip } from "@/components/ui/tooltip";
import ExpenceTypeEditForm from "@/components/edit/ExpenceTypeEdit";

type IExpenceTypeTableBody = {
  data: Array<IexpenceTypeProps>;
};

const ExpenceTypeTableCell = (expenceTypeDataProps: IexpenceTypeProps) => {
  const { id, expence_type } = expenceTypeDataProps;
  return (
    <Table.Row>
      <Table.Cell pl="0px">{id}</Table.Cell>
      <Table.Cell pl="0px">
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {expence_type}
        </Text>
      </Table.Cell>
      <Table.Cell pl="0px">
        <Wrap align={"center"} gap={2}>
          <Modalsheet
            buttonText={"Edit ExpenceType"}
            modalTitle={"Edit Epence Type Data"}
            formComponent={<ExpenceTypeEditForm data={expenceTypeDataProps} />}
          >
            <IconButton aria-label="Edit" variant={"ghost"}>
              <Tooltip content="Edit">
                <Pencil />
              </Tooltip>
            </IconButton>
          </Modalsheet>
        </Wrap>
      </Table.Cell>
    </Table.Row>
  );
};

function ExpenceTypeTableBody(props: IExpenceTypeTableBody) {
  const { data } = props;
  return (
    <Table.Body>
      {data.map((item, index) => {
        return (
          <ExpenceTypeTableCell
            key={index}
            id={item.id}
            expence_type={item.expence_type}
          />
        );
      })}
    </Table.Body>
  );
}

export default ExpenceTypeTableBody;
