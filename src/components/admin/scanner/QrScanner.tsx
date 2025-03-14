import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";

import { useZxing } from "react-zxing";

function QrScanner(props: any) {
  const { visibility } = props;

  const [result, setResult] = useState("");

  const [paused, setPaused] = useState(false);

  const { ref } = useZxing({
    paused,
    onDecodeResult(result) {
      setResult(result.getText());
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
