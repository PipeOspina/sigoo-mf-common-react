import { Skeleton, Typography } from "@mui/material";
import { useLoading, useUser } from "../../../hooks";

const noUser = "Error al cargar el usuario";

export const UserInfo = () => {
  const { loading } = useLoading("auth");
  const user = useUser();

  return (
    <>
      <Typography color="primary" variant="body2" noWrap>
        {loading ? (
          <Skeleton width={200} />
        ) : (
          user?.preferred_username ?? user?.fullName ?? noUser
        )}
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
        {loading ? (
          <Skeleton width={80} />
        ) : (
          `${
            user?.terminal || user?.terminal === 0
              ? String(user.terminal).padStart(2, "0")
              : "N/A"
          } - ${user?.abreviado ? user.abreviado : "N/A"}`
        )}
      </Typography>
    </>
  );
};
