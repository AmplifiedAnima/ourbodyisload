import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Typography, TextField, FormControl, Button } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

export interface ChangePasswordData {
  newPassword: string;
}

export const ChangePasswordComponent = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>();

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ChangePasswordData> = async (data) => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          newPassword: data.newPassword,
        }),
      });

      if (response.ok) {
        setApiError(null);
      } else {
        const errorData = await response.json();
        setApiError(errorData.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setApiError("An error occurred while resetting the password");
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
        Reset Password
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <FormControl fullWidth margin="normal">
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            {...register("newPassword", { required: true })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
        </FormControl>
        {apiError && (
          <p className="error" style={{ color: "red" }}>
            {apiError}
          </p>
        )}
        <Button
          type="submit"
          sx={{
            mt: 2,
            ...ButtonStylingForApp,
            "&:hover": {
              bgcolor: "green",
            },
            display: "block",
            width: "100%",
          }}
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};
