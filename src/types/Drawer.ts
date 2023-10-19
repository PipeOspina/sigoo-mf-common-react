import { SvgIconProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, ReactNode, isValidElement } from "react";

export type DrawerItemLabel = {
  primary: ReactNode;
  secondary?: ReactNode;
};

export type DrawerItem = {
  id: string;
  label: ReactNode | DrawerItemLabel;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | FC<SvgIconProps>;
  open?: boolean;
  active?: boolean;
  children?: DrawerItem[];
  disabled?: boolean;
  onClick?: () => void;
};

export const isDrawerItemLabel = (
  label: ReactNode | DrawerItemLabel
): label is DrawerItemLabel => {
  return (
    label !== null &&
    typeof label !== "undefined" &&
    typeof label === "object" &&
    !isValidElement(label)
  );
};
