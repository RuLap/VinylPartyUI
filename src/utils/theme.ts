'use client'

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
      heading: 'var(--font-rubik)',
      body: 'var(--font-rubik)',
    }
});

const colors = {
  primary: "#221B12",
  secondary: "#FFFFFF",
  secondary_fixed: "#E6801A"
}

const customTheme = extendTheme({ colors });

export default customTheme;