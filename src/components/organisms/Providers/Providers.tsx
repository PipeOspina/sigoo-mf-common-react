import { Theme, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { AuthProvider, LoadingProvider } from "../../../contexts";
import { theme as muiTheme } from "../../../utils";

export type ProvidersProps = PropsWithChildren<{
  theme?: Theme;
}>;

export const Providers: FC<ProvidersProps> = (props) => {
  const { children, theme } = props;

  return (
    <ThemeProvider theme={theme ?? muiTheme}>
      <LoadingProvider>
        <AuthProvider>{children}</AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};
