import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  ButtonBase,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { MouseEventHandler, useCallback, useState } from "react";
import { useLoading } from "../../../hooks";

export const UserActionsButton = () => {
  const [menuAnchor, setMenuAnchor] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const { loading } = useLoading("auth");

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      setMenuAnchor((current) => (current ? null : event.currentTarget));
      event.preventDefault();
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  const handleLogout = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  return (
    <>
      <ButtonBase
        onClick={toggleMenu}
        sx={{ borderRadius: "50%", mr: 2 }}
        disabled={loading}
      >
        <Avatar
          {...(loading && {
            children: <CircularProgress size={18} color="inherit" />,
          })}
        />
      </ButtonBase>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
