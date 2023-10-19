import { CssBaseline, Theme } from "@mui/material";
import { FC, Fragment, PropsWithChildren, useEffect } from "react";
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

const ApplyProps: FC<AppLayoutProps> = (props) => {
  const { label = "Sigoo App" } = props;

  useEffect(() => {
    if (document) {
      document.title = label;
    }
  }, [label]);

  return <Fragment />;
};

export const AppLayout: FC<AppLayoutProps> = (props) => {
  const { children, theme } = props;

  return (
    <Providers theme={theme}>
      <ApplyProps {...props} />
      <CssBaseline />
      <CustomDrawer>
        <CustomToolbar />
        {children}
      </CustomDrawer>
      <DropdownLoading />
    </Providers>
  );
};
