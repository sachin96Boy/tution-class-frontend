import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";
import { useBreakpointValue } from "@chakra-ui/react";

export type Iresponse = {
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  message: string;
};

const useToastResponse = () => {
  const toastposition = useBreakpointValue({
    base: "bottom",
    md: "top-right",
  }) as any;

  const [state, setState] = useState<any>();
  useEffect(() => {
    if (state) {
      const { message, status } = state;
      toaster.create({
        title: message,
        type: status,
        duration: 5000,
        placement: toastposition,
      });
    }
  }, [state, toaster]);
  return [state, setState];
};

export default useToastResponse;
