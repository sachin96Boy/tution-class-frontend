import { getStudentDatabasedOnScannedId } from "@/features/attandance/attandanceAction";
import { AppDispatch } from "@/store";
import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useZxing } from "react-zxing";

type IqrScanner = {
  visibility: boolean;
};

function QrScanner(props: IqrScanner) {
  const { visibility } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [result, setResult] = useState("");
  const [paused, setPaused] = useState(false);

  const handleScannedId = async () => {
    await dispatch(
      getStudentDatabasedOnScannedId({
        scanned_id: result,
      })
    );
  };

  const { ref } = useZxing({
    paused,
    onDecodeResult(result) {
      setResult(result.getText());
      setPaused(!paused);
      handleScannedId();
    },
    onDecodeError(error) {
      console.log(error);
    },
    onError(error) {
      console.log(error);
    },
  });
  return (
    <>
      {visibility ? (
        <>
          <Box as={"video"} ref={ref} p={2} rounded={"2xl"} />
          <Button variant={"ghost"} onClick={() => setPaused(!paused)}>
            {paused ? "Resume" : "Pause"}
          </Button>
          <p>
            <span>Last result:</span>
            <span>{result}</span>
          </p>
        </>
      ) : (
        <Box>
          <Heading>Waiting to Turn On</Heading>
        </Box>
      )}
    </>
  );
}

export default QrScanner;
