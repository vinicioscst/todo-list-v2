import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AppGlobalStyles from "./app-global.styles";
import theme from "@/styles/theme";

interface IAppConfig {
  children: React.ReactNode;
}

function AppConfig({ children }: IAppConfig) {
  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <AppGlobalStyles />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default AppConfig;
