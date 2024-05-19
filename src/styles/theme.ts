"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      "900": "#0d0714",
      "800": "#15101c",
      "700": "#1d1825",
    },
    secondary: {
      main: "#78cfb0",
      "500": "#9e78cf",
      "300": "#ab89d6",
    },
    text: {
      primary: "#777777",
    },
  },
});

export default theme;
