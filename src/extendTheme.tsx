import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = {
  theme: {
    tokens: {
      fonts: {
        body: { value: "Roboto, system-ui, sans-serif" },
        heading: { value: "Roboto, system-ui, sans-serif" },
        fantasy: { value: "Noto Sans Sinhala, sans-serif" },
      },
    },
  },
};

const customSystem = createSystem(defaultConfig, config);

export default customSystem;
