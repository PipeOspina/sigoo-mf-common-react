import { CssBaseline, Theme } from "@mui/material";
import { FC, PropsWithChildren, useEffect } from "react";
import { DropdownLoading } from "../../atoms/DropdownLoading";
import { CustomDrawer } from "../CustomDrawer";
import { CustomToolbar } from "../CustomToolbar";
import { Providers } from "../Providers";

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

  useEffect(() => {
    if (document) {
      document.title = label;
    }
  }, [label]);

  return (
    <Providers theme={theme}>
      <CssBaseline />
      <CustomDrawer>
        <CustomToolbar
          label={label}
          onSearchChange={onSearchChange}
          search={search}
          searchValue={searchValue}
        />
        {children}
      </CustomDrawer>
      <DropdownLoading />
    </Providers>
  );
};
