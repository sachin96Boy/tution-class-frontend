import { createToaster, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type Iresponse = {
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  message: string;
};

const useToastResponse = () => {
  const toastposition = useBreakpointValue({
    base: "bottom",
    md: "top-right",
  }) as any;
  const toast = createToaster();
  const [state, setState] = useState<any>();
  useEffect(() => {
    if (state) {
      const { message, status } = state;
      toast({
        title: message,
        status: status,
        duration: 5000,
        isClosable: true,
        position: toastposition,
        containerStyle: {
          marginTop: "40px",
          marginBottom: "60px",
        },
      });
    }
  }, [state, toast, toastposition]);
  return [state, setState];
};

export default useToastResponse;
