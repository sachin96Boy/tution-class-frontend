import { Box, Image } from "@chakra-ui/react";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Header_Logo from "../assets/header/logos/Sipsa_logo.png";

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
      <a href={linkPath}>
        <Image
          boxSize={boxSize}
          src={company ? `${logoPath}` : Header_Logo}
          objectFit={fitType}
          alt={company ? `${company.name}` : "company"}
        />
      </a>
    </Box>
  );
}

export default Logo;
