import React from "react";
import { Snackbar, Alert, AlertTitle, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CustomBackdrop = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(0.8px)",
  zIndex: 999,
});

interface ErrorHandlerDisplayProps {
  open: boolean;
  handleClose: () => void;
  error: string;
}

const ErrorHandlerDisplayComponent: React.FC<ErrorHandlerDisplayProps> = ({
  open,
  handleClose,
  error,
}) => {
  return (
    <>
      <CustomBackdrop>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ zIndex: 2 }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "#f74f25",
            ".MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <AlertTitle sx={{ color: "white" }}>Error</AlertTitle>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              "@media (max-width: 768px)": {
                fontSize: "14px",
              },
            }}
          >
            {error}
          </Typography>
        </Alert>
      </Snackbar>
      </CustomBackdrop>
    </>
  );
};

export default ErrorHandlerDisplayComponent;
