import { extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import "@fontsource/roboto";
import "@fontsource/noto-sans-sinhala";

const customTheme = extendTheme(
  {
    fonts: {
      body: "Roboto, system-ui, sans-serif",
      heading: "Roboto, system-ui, sans-serif",
      fantasy: "Noto Sans Sinhala, sans-serif",
    },
    components: {
      Steps,
    },
  },
  theme
);

export default customTheme;
