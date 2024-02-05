import { Box, Typography } from "@mui/material";

export const LoginToAccessThisPartComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        padding: "10px",
        margin: "24px",
        width: "auto",
        background:
          "linear-gradient(to left, rgba(255, 255, 255, 0.1) 10%, rgba(94, 0, 140, 0.4) 80%)",
        borderRadius: "6px",
        textAlign: "center",

        boxShadow: "0 3px 5px 2px rgba(155, 105, 135, 0.8)",
        "@media (max-width: 768px)": {
          padding: "6px",
          margin: "10px",
        },
        "@media (max-width: 280px)": {
          padding: "4px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: "bold",

          letterSpacing: "0.4px",
          color: "black",
          textShadow: "4px 4px 8px white",
          "@media (max-width: 768px)": {
            fontSize: "18px",
          },
          "@media (max-width: 280px)": {
            fontSize: "15px",
            paddingLeft: "0px",
          },
        }}
      >
        You can view this content once you have logged in
      </Typography>
    </Box>
  );
};
