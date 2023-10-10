import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts";
import { useLoading } from "../../../hooks";
import { decodeToken } from "../../../utils";
import { Logo, ToolbarLoading } from "../../atoms";
import { AppsHubButton, UserActionsButton, UserInfo } from "../../molecules";

export type CustomToolbarProps = {
  label: string;
  search?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export const CustomToolbar: FC<CustomToolbarProps> = (props) => {
  const { label, onSearchChange, search, searchValue } = props;

  const { setUser } = useContext(AuthContext);
  const { setLoading } = useLoading("auth");

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
        <IconButton>
          <MenuIcon />
        </IconButton>
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
