import { createSystem, defaultConfig } from "@chakra-ui/react";

const config = {
  theme: {
    tokens: {
      colors: {
        primary_color: { value: "#215DA7" },
        border_focus_color: { value: "#B6D7FF" },
        gold_gradient_start: { value: "#F4BB4E" },
        gold_gradient_stop: { value: "#A06D3A" },
        primary_gradint_strt: { value: "#205EAA" },
        primary_gradient_stop: { value: "#2B2D4E" },
        light_bg_card: { value: "#E6F1FF" },
        text_econdary_color_card: { value: "#545454" },
        light_bg_blue: { value: "#B6D7FF" },
        text_econdary_color: { value: "#585858" },
        verified_green_text: { value: "#2ECC71" }
      },
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
