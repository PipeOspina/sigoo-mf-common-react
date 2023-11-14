import { useAppSelector, useUser } from "@/hooks";
import { Box, Drawer, Toolbar } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { DrawerLists } from "../DrawerLists";

const drawerWidth = 240;

export type CustomDrawerProps = PropsWithChildren<{}>;

export const CustomDrawer: FC<CustomDrawerProps> = (props) => {
  const { children } = props;

  const user = useUser();

  const open = useAppSelector(
    (state) => state.drawer.open && state.drawer.items.length > 0
  );

  return (
    <>
      <Drawer
        open={open && !!user}
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <DrawerLists />
        </Box>
      </Drawer>
      <Toolbar />
      <Box
        width="fit-content"
        py={2}
        px={9.5}
        display="flex"
        sx={{
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && !!user
            ? {
                marginLeft: `${drawerWidth}px`,
                transition: (theme) =>
                  theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
              }
            : {}),
        }}
      >
        {children}
      </Box>
    </>
  );
};
