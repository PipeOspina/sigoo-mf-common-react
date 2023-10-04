import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const PickupIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16">
      <g>
        <path d="M9 9l3-3-3-3v2H2v2h7zm7-3.5h2.5L20.46 8H16zM5 12A1 1 0 1 1 5 14.003 1 1 0 0 1 5 12zm12 0a1 1 0 1 1-.001 2.002 1 1 0 0 1 0-2.001zm0 4c1.654 0 3-1.346 3-3h2V8l-3-4h-3V0H0v3h2V2h12v9H7.22a2.965 2.965 0 0 0-4.44 0H2V8.92H0V13h2c0 1.655 1.346 3 3 3s3-1.346 3-3h6c0 1.655 1.346 3 3 3z" />
      </g>
    </SvgIcon>
  );
};
