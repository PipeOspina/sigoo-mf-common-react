import AppsIcon from "@mui/icons-material/Apps";
import { Box, Grid, IconButton, Popover } from "@mui/material";
import { MouseEventHandler, useCallback, useState } from "react";
import { hubApps } from "../../../consts";
import { HubAppButton } from "../../atoms";

export const AppsHubButton = () => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const toggleOpen: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      setAnchorEl((current) => (current ? null : event.currentTarget));
      event.preventDefault();
    },
    []
  );

  const handleClickAway = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box>
      <IconButton onClick={toggleOpen}>
        <AppsIcon />
      </IconButton>
      <Box>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClickAway}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                width: 320,
                px: 1,
                py: 2,
                borderRadius: 2,
              },
            },
          }}
        >
          <Grid container>
            {hubApps.map((app, i) => {
              return (
                <Grid
                  item
                  key={`APPS_HUB_APP_${app.label.toUpperCase()}_${i}`}
                  xs={4}
                >
                  <HubAppButton {...app} />
                </Grid>
              );
            })}
          </Grid>
        </Popover>
      </Box>
    </Box>
  );
};
