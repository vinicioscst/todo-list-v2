"use client";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";

interface IThemeContext {
  handleTheme(): void;
  mode: "light" | "dark";
  theme: Theme;
}

interface IAppThemeProvider {
  children: React.ReactNode;
}

export const ThemeContext = createContext({} as IThemeContext);

function AppThemeProvider({ children }: IAppThemeProvider) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
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
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                position: "static",
                backgroundColor: "transparent",
                boxShadow: "0 0",
              },
            },
          },
        },
      }),
    [mode]
  );

  function handleTheme() {
    colorMode.toggleColorMode();
    localStorage.setItem("TODOLIST@THEME", mode);
    console.log(theme);
  }

  return (
    <ThemeContext.Provider value={{ handleTheme, mode, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default AppThemeProvider;
