import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/slices/authSlice";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { AppDispatch } from "../../../store/store";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material";

interface formData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface errorMessage {
  message: string[];
  statusCode?: number;
}

export const RegistrationComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [submissionError, setSubmissionError] = useState<errorMessage | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (data: formData) => {
    dispatch(signUp(data))
      .unwrap()
      .then((response) => {
        if (response.message) {
          if (
            response.message.includes(
              "confirmPassword must match password exactly"
            )
          ) {
            setSubmissionError({
              message: ["Confirmed password must match password exactly"],
            });
            if (response.error.statusCode === 409) {
              setSubmissionError({
                message: [response.message],
              });
            }
          } else {
            setSubmissionError(response);
            console.log(response);
          }
        } else {
          setIsSubmittedSuccessfully(true);
        }
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmittedSuccessfully) {
      navigate("/");
    }
  }, [isSubmittedSuccessfully, navigate]);

  const formStyles = {
    maxWidth: "800px",
    width: "100%",
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            margin: "30px",
            "@media (max-width: 280px)": {
              fontSize: "22`px",
            },
          }}
        >
          Registration page
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
          <Box
            mt={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <FormControl variant="outlined" error={!!errors.username}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </FormControl>

            <FormControl variant="outlined" error={!!errors.password}>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </FormControl>
            <FormControl variant="outlined" error={!!errors.confirmPassword}>
              <TextField
                id="confirmed password"
                label="Confirm password"
                type="password"
                variant="outlined"
                {...register("confirmPassword", {
                  required: "Confirmed password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </FormControl>

            <FormControl variant="outlined" error={!!errors.email}>
              <TextField
                id="email"
                label="E-mail"
                type="email"
                variant="outlined"
                {...register("email", { required: "E-mail is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>

            <Button
              type="submit"
              sx={{
                ...ButtonStylingForApp,
                "&:hover": {
                  background: "green",
                },
              }}
            >
              Sign Up
            </Button>
            {submissionError && (
              <Box sx={{ color: "red" }}>
                {Array.isArray(submissionError.message) ? (
                  submissionError.message.map((errMsg, index) => (
                    <Typography key={index}>{errMsg}</Typography>
                  ))
                ) : (
                  <Typography>{submissionError.message}</Typography>
                )}
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};
