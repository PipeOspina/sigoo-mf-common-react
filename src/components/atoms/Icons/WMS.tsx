import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const WMSIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 21.6"
    >
      <path
        id="dresser-outline"
        d="M4.4,3A2.407,2.407,0,0,0,2,5.4V21a2.4,2.4,0,0,0,2.4,2.4v1.2H6.8V23.4H21.2v1.2h2.4V23.4A2.392,2.392,0,0,0,26,21V5.4A2.4,2.4,0,0,0,23.6,3H4.4m0,2.4H23.6V9H4.4V5.4m7.2,1.2V7.8h4.8V6.6H11.6M4.4,11.4H23.6V15H4.4V11.4m7.2,1.2v1.2h4.8V12.6H11.6M4.4,17.4H23.6V21H4.4V17.4m7.2,1.2v1.2h4.8V18.6Z"
        transform="translate(-2 -3)"
      />
    </SvgIcon>
  );
};
