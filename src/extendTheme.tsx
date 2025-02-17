import { createSystem, defineConfig } from "@chakra-ui/react";

import "@fontsource/roboto";
import "@fontsource/noto-sans-sinhala";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "Roboto, system-ui, sans-serif" },
        heading: { value: "Roboto, system-ui, sans-serif" },
        fantasy: { value: "Noto Sans Sinhala, sans-serif" },
      },
    },
  },
});

const customSystem = createSystem(config);

export default customSystem;
