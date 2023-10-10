import { Backdrop, CircularProgress } from "@mui/material";
import { useLoading } from "../../../hooks";

export const DropdownLoading = () => {
  const { loading } = useLoading("dropdown");

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
