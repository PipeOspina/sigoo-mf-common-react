import { Box, BoxProps, Collapse, LinearProgress } from "@mui/material";
import { FC } from "react";
import { useLoading } from "../../../hooks";

export const ToolbarLoading: FC<BoxProps> = (props) => {
  const { loading } = useLoading();

  return (
    <Box {...props}>
      <Collapse in={loading}>
        <LinearProgress sx={{ height: 3 }} />
      </Collapse>
    </Box>
  );
};
