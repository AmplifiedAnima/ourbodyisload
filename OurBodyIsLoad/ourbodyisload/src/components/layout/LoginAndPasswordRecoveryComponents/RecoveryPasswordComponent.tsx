import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Typography, TextField, Button, FormControl } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
type FormData = {
  email: string;
};

export const RecoveryPasswordComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/auth/recover-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send recovery link");
      }

      // Handle response success
      const result = await response.json();
      console.log(result);
      alert(
        "If an account with that email exists, a recovery email has been sent."
      );
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your request.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Recover Password
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormControl>
        <Button
          type="submit"
          sx={{
            ...ButtonStylingForApp,
            mt: 2,
            "&:hover": {
              bgcolor: "green",
            },
            display: "block",
            width: "100%",
          }}
        >
          Send Recovery Link
        </Button>
      </form>
    </Box>
  );
};
