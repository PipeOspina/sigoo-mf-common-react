import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, MouseEventHandler, useCallback, useState } from "react";
import { Logo } from "../../atoms";
import { AppsHubButton } from "../../molecules";

export type CustomToolbarProps = {
  label: string;
  search?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export const CustomToolbar: FC<CustomToolbarProps> = (props) => {
  const { label, onSearchChange, search, searchValue } = props;

  const [menuAnchor, setMenuAnchor] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Box display="flex" alignItems="center" width="100%" ml={8}>
              <Box display="flex" alignItems="flex-end">
                <a href="/">
                  <Logo width={95} />
                </a>
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                  {label}
                </Typography>
              </Box>
            </Box>
            {search && (
              <Box width={500} mr={2} display="flex" flexDirection="column">
                <TextField
                  fullWidth
                  size="small"
                  placeholder={`Cambiar subtitulo para ${label}`}
                  value={searchValue}
                  onChange={(event) => onSearchChange?.(event.target.value)}
                />
              </Box>
            )}
            <Box
              width="fit-content"
              mr={2}
              display="flex"
              flexDirection="column"
            >
              <Typography color="primary" variant="body2" noWrap>
                felipe.ospina@qcode.co
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  width: "fit-content",
                  display: "flex",
                }}
              >
                <Typography
                  color="black"
                  component="span"
                  variant="body2"
                  sx={{ mr: 1 }}
                >
                  Terminal:
                </Typography>
                01 - BOG
              </Typography>
            </Box>
            <ButtonBase
              onClick={toggleMenu}
              sx={{ borderRadius: "50%", mr: 2 }}
            >
              <Avatar />
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
            <AppsHubButton />
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
    </>
  );
};
