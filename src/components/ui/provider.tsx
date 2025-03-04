"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {  type ColorModeProviderProps } from "./color-mode";
import customSystem from "@/extendTheme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider  value={customSystem}>
      {props.children}
      {/* <ColorModeProvider  {...props} /> */}
    </ChakraProvider>
  );
}
