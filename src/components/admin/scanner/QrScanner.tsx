import { getStudentDatabasedOnScannedId } from "@/features/attandance/attandanceAction";
import { AppDispatch } from "@/store";
import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useZxing } from "react-zxing";

type IqrScanner = {
  visibility: boolean;
};

type resData = {
  data: string;
};

function QrScanner(props: IqrScanner) {
  const { visibility } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [result, setResult] = useState("");
  const [paused, setPaused] = useState(false);

  const handleScannedId = async (props: resData) => {
    const { data } = props;
    await dispatch(
      getStudentDatabasedOnScannedId({
        scanned_id: data,
      })
    );
  };

  const { ref } = useZxing({
    paused,
    async onDecodeResult(result) {
      const data = result.getText();
      setPaused(!paused);

      await handleScannedId({
        data: data,
      });
    },
    onDecodeError(error) {
      // setPaused(!paused);
      console.log(error);
    },
    onError(error) {
      setPaused(!paused);
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
