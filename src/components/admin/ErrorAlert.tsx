import type { FC } from "react";
import { Alert, Box } from "@mui/material";

const ErrorAlert: FC = () => {
  return (
    <Box className="flex justify-center items-center h-full">
      <Alert
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          fontSize: { xxl: "1.5rem" },
          textAlign: "center",
          marginBlock: 16,
        }}
        severity="error"
        variant="outlined"
      >
        Помилка завантаження даних
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
