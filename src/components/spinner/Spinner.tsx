import { Center, Spinner as CustomSpinner } from "@chakra-ui/react";
import React from "react";

function Spinner() {
  return (
    <Center>
      <CustomSpinner size="md" color="colorPalette.600" colorPalette={"blue"} />
    </Center>
  );
}

export default Spinner;
