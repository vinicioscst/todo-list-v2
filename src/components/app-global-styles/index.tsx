"use client";
import theme from "@/styles/theme";
import { GlobalStyles, createTheme } from "@mui/material";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function AppGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: theme.palette.background.default,
          padding: "0 1rem",
          fontFamily: roboto.style.fontFamily,
          color: theme.palette.text.primary,
        },
      }}
    />
  );
}

export default AppGlobalStyles;
