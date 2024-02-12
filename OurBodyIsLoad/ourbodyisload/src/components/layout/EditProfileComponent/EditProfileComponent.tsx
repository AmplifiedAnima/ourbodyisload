import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../store/slices/authSlice";
import { AuthState } from "../../../interfaces/auth.interface";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { LoginToAccessThisPartComponent } from "../LoginToAccessThisPartComponent/LoginToAccessThisPartComponent";

export interface UpdateProfileData {
  username?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const EditProfileComponent: React.FC = () => {
  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const userData = {
    username: authState.username,
    email: authState.email,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>({ defaultValues: userData });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: UpdateProfileData) => {
    try {
      const authToken: string | null = authState.accessToken;
      const response = await dispatch(
        updateProfile({ credentials: data, authToken })
      );

      if (updateProfile.fulfilled.match(response)) {
        console.log("Profile updated successfully");
      } else {
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      {authState.isLoggedIn ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
            gap: 2,
            padding:3
          }}
        >
          <Typography variant="h4">Edit Profile</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Username"
                variant="outlined"
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                variant="outlined"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Current password"
                type="password"
                variant="outlined"
                {...register("currentPassword", {
                  minLength: 8,
                  maxLength: 32,
                })}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="new Password"
                type="password"
                variant="outlined"
                {...register("newPassword", { minLength: 8, maxLength: 32 })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            </FormControl>
            <Button
              type="submit"
              sx={{
                ...ButtonStylingForApp,
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  background: "green",
                },
              }}
            >
              Update Profile
            </Button>
          </form>
        </Box>
      ) : (
        <LoginToAccessThisPartComponent />
      )}
    </>
  );
};
