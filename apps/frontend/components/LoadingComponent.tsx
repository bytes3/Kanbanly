import React from "react";
import { Box, Spinner } from "@gluestack-ui/themed";

export function LoadingComponent() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Spinner size="large" color="$primary500" />
    </Box>
  );
}
