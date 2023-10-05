import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { theme as muiTheme } from "../../../utils";
import { CustomToolbar } from "../CustomToolbar";

export type AppLayoutProps = PropsWithChildren<{
  label?: string;
  theme?: Theme;
  search?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}>;

export const AppLayout: FC<AppLayoutProps> = (props) => {
  const {
    children,
    label = "Sigoo App",
    theme,
    onSearchChange,
    search,
    searchValue,
  } = props;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme ?? muiTheme}>
        <CustomToolbar
          label={label}
          onSearchChange={onSearchChange}
          search={search}
          searchValue={searchValue}
        />
        {children}
      </ThemeProvider>
    </>
  );
};
