import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { theme as muiTheme } from "../../../utils";
import { CustomToolbar } from "../CustomToolbar";

export type AppLayoutProps = PropsWithChildren<{
  label?: string;
  theme?: Theme;
}>;

export const AppLayout: FC<AppLayoutProps> = (props) => {
  const { children, label = "Sigoo App", theme } = props;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme ?? muiTheme}>
        <CustomToolbar label={label} />
        {children}
      </ThemeProvider>
    </>
  );
};
