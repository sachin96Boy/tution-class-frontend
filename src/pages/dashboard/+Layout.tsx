import DashBoardOutlet from "@/components/outlet/Dashboard_outlet";
import { RootState } from "@/store";
import { Center, Flex, ProgressCircle } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function Layout({ children }: { children: React.ReactNode }) {
  const { loading, error, errorMsg } = useSelector(
    (state: RootState) => state.config
  );
  return (
    <>
      {loading ? (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Center>
            <ProgressCircle.Root value={null}>
              <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range stroke="orange" />
              </ProgressCircle.Circle>
            </ProgressCircle.Root>
          </Center>
        </Flex>
      ) : error ? (
        <Center>{errorMsg.toString()}</Center>
      ) : (
        <DashBoardOutlet>{children}</DashBoardOutlet>
      )}
    </>
  );
}

export default Layout;
