import { Box } from "@chakra-ui/react";
import { Outlet,} from "react-router-dom";
import Header from "../header/Header";
import SideBar from "../sidebar/SideBar";

function DashBoardOutlet() {
  return (
    <Box
      className="PageBody"
      overflow={"hidden"}
      display="flex"
      flexDirection={"column"}
      w="full"
      h={"100vh"}
    >
      <Header />
      <Box
        className="containerNew"
        display={"flex"}
        flex="1"
        overflow={"hidden"}
        w="100vw"
      >
        {/* add sidebar component Here*/}
        <SideBar />
        <Box
          className="otherSection"
          display={"flex"}
          flex="1"
          overflowY={"auto"}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashBoardOutlet;
