import React from "react";
import { Box, Image, ResponsiveValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Header_Logo from "../assets/header/logos/Sipsa_logo.png";

interface PropTypes {
  boxSize: string;
  linkPath: string;
  fitType: ResponsiveValue<any>;
}

function Logo(props: PropTypes) {
  let { boxSize, linkPath, fitType } = props;
  return (
    <Box className="class-logo">
      <Link to={linkPath}>
        <Image
          boxSize={boxSize}
          src={Header_Logo}
          objectFit={fitType}
          alt="sipsa Institute"
        />
      </Link>
    </Box>
  );
}

export default Logo;
