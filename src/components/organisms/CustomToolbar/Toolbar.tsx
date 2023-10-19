import { Logo, ToolbarLoading } from "@/atoms";
import { AuthContext } from "@/contexts";
import { useAppDispatch, useAppSelector, useLoading } from "@/hooks";
import { AppsHubButton, UserActionsButton, UserInfo } from "@/molecules";
import { setOpen } from "@/redux";
import { decodeToken } from "@/utils";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useCallback, useContext, useEffect } from "react";

export const CustomToolbar = () => {
  const open = useAppSelector((state) => state.drawer.open);
  const itemsLength = useAppSelector((state) => state.drawer.items.length);

  const dispatch = useAppDispatch();

  const { setUser } = useContext(AuthContext);
  const { setLoading } = useLoading("auth");

  const toggleOpen = useCallback(() => {
    dispatch(setOpen(!open));
  }, [open]);

  useEffect(() => {
    if (document?.location) {
      const params = new URLSearchParams(document.location.search);
      const token = params.get("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      const user = decodeToken(token);
      setUser(user);
      setLoading(false);
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Toolbar>
        {itemsLength ? (
          <IconButton onClick={toggleOpen}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        ) : null}
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          ml={itemsLength ? 1.5 : 6.5}
        >
          <Box display="flex" alignItems="flex-end">
            <a href="/" style={{ display: "flex" }}>
              <Logo width={95} />
            </a>
            <Typography
              variant="body2"
              sx={{ color: (theme) => theme.palette.grey[500], mb: -0.5 }}
            >
              {/* label */}
            </Typography>
          </Box>
        </Box>
        <Box width="fit-content" mr={2} display="flex" flexDirection="column">
          <UserInfo />
        </Box>
        <UserActionsButton />
        <AppsHubButton />
      </Toolbar>
      <ToolbarLoading
        position="absolute"
        width="100%"
        bottom={0}
        zIndex={100}
      />
    </AppBar>
  );
};
