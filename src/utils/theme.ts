import { createTheme } from "@mui/material";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0A6BB6",
    },
    secondary: {
      main: "#F15A24",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});
