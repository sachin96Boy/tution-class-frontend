import { extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/react";
import "@fontsource/roboto";
import "@fontsource/noto-sans-sinhala";

const customTheme = extendTheme(
  {
    fonts: {
      body: "Roboto, system-ui, sans-serif",
      heading: "Roboto, system-ui, sans-serif",
      sinhala: "Noto Sans Sinhala, sans-serif",
    },
  },
  theme
);

export default customTheme;
