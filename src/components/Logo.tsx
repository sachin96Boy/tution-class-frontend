import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Header_Logo from "../assets/header/logos/Sipsa_logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface PropTypes {
  boxSize: string;
  linkPath: string;
  fitType: "contain" | "cover" | "scale-down";
}

function Logo(props: PropTypes) {
  const { company } = useSelector((state: RootState) => state.config);

  const logoPath = `${import.meta.env.VITE_BACKEND_STATIC}/logo/${
    company?.logo
  }`;

  let { boxSize, linkPath, fitType } = props;
  return (
    <Box className="class-logo">
      <Link to={linkPath}>
        <Image
          boxSize={boxSize}
          src={company ? `${logoPath}` : Header_Logo}
          objectFit={fitType}
          alt={company ? `${company.name}` : "company"}
        />
      </Link>
    </Box>
  );
}

export default Logo;
