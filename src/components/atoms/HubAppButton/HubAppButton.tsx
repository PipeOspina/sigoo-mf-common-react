import { Box, ButtonBase, Typography } from "@mui/material";
import { FC } from "react";
import { HubApp } from "../../../types";

export type HubAppButtonProps = HubApp;

export const HubAppButton: FC<HubAppButtonProps> = (props) => {
  const { Icon, label, url } = props;

  return (
    <ButtonBase
      href={url}
      sx={{
        width: "100%",
        height: 100,
        borderRadius: 2,
        color: (theme) => theme.palette.grey[600],
        "&:hover": {
          color: (theme) => theme.palette.primary.main,
        },
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
      >
        <Icon />
        <Typography variant="caption" mt={2}>
          <strong>{label}</strong>
        </Typography>
      </Box>
    </ButtonBase>
  );
};
