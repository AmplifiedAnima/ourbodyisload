import { Alert, Snackbar, Typography } from "@mui/material";

interface notificationDisplayProps {
  open: boolean;
  handleClose: () => void;
  notification: string;
}

export const NotificationHandlerDisplayComponent: React.FC<
  notificationDisplayProps
> = ({ open, handleClose, notification }) => {
  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ zIndex: 99999 }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: "400px",
            maxWidth: "auto",
            textAlign: "center",
            backgroundColor: "#f7f2fa",
            ".MuiSvgIcon-root": {
              color: "#7d4b99",
            },
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#7d4b99",
              "@media (max-width: 768px)": {
                fontSize: "14px",
              },
            }}
          >
            {notification}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};
