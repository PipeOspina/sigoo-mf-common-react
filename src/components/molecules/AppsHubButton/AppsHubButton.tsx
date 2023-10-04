import AppsIcon from "@mui/icons-material/Apps";
import {
  Box,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  Paper,
  Popper,
} from "@mui/material";
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
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          transition
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Fade {...TransitionProps} timeout={100}>
                <Paper
                  elevation={24}
                  sx={{
                    width: 320,
                    px: 1,
                    py: 2,
                    mt: 3,
                    mr: 1,
                    borderRadius: 2,
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
                </Paper>
              </Fade>
            </ClickAwayListener>
          )}
        </Popper>
      </Box>
    </Box>
  );
};
