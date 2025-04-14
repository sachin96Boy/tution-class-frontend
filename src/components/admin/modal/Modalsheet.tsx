import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";

type ImodelSheet = {
  buttonText: string;
  modalTitle: string;
  formComponent: React.ReactNode;
  children: React.ReactNode;
};

function Modalsheet({ buttonText, modalTitle, formComponent, children }: ImodelSheet) {
  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      size={["full", "full", "sm"]}
      placement={["bottom", "bottom", "center"]}
    >
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content minH={"40vh"}>
            <Dialog.Header>
              <Dialog.Title>{modalTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{formComponent}</Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default Modalsheet;
