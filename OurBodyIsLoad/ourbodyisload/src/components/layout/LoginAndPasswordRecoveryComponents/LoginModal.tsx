import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { signIn } from "../../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { Link } from "react-router-dom";

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleLogin = async () => {
    const actionResult = await dispatch(
      signIn({
        username: credentials.username,
        password: credentials.password,
      })
    );
    if (actionResult.meta.requestStatus === "fulfilled") {
      if (actionResult.payload && actionResult.payload.message) {
        setErrorLogin(actionResult.payload.message);
        console.log(actionResult.payload.message);
        console.log(errorLogin);
      } else {
        handleClose();
        setErrorLogin("");
      }
    } else {
      setErrorLogin("An unexpected error occurred.");
    }
  };

  const inputStylingSx = {
    width: "260px",
    padding: "10px 0px",
    marginBottom: "0px",
    "@media (max-width: 280px)": {
      width: "auto",
    },
  };

  interface ButtonWithLinkProps {
    to: string;
    label: string;
  }

  const LinkWithStyles: React.FC<ButtonWithLinkProps> = ({ to, label }) => {
    return (
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: "black",
          padding: "10px 15px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",

            fontSize: "20px",
            color: "black",
            textAlign: "center",
          }}
        >
          {label}
        </Typography>
      </Link>
    );
  };
  return (
    <Box>
      <Button
        onClick={handleOpen}
        sx={{
          ...ButtonStylingForApp,
          padding: "6px 15px",
          margin: "30px",
          letterSpacing: "1.5px",
          fontWeight: "bold",
          "@media (max-width: 768px)": {
            marginTop: "25px",
            padding: "3px 15px",
          },
          "@media (max-width: 280px)": {
            marginLeft: "10px",
            padding: "4px 15px",
          },
        }}
      >
        LOGIN
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ background: "rgba(94, 0, 140, 0.3)", zIndex: "10000" }}
      >
        <DialogContent>
          <form>
            <Box>
              <TextField
                type="text"
                name="username"
                placeholder="Username"
                sx={inputStylingSx}
                onChange={handleInputChange}
                value={credentials.username}
              />
            </Box>
            <Box>
              <TextField
                type="password"
                name="password"
                placeholder="Password"
                sx={inputStylingSx}
                onChange={handleInputChange}
                value={credentials.password}
              />
            </Box>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              ...ButtonStylingForApp,
              marginRight: "auto",
              marginLeft: "20px",
              "&:hover": {
                background: "red",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            sx={{
              ...ButtonStylingForApp,
              marginRight: "20px",
              "&:hover": {
                background: "green",
                color: "white",
              },
            }}
          >
            Login
          </Button>
        </DialogActions>
        {errorLogin && (
          <Typography
            color="error"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            {errorLogin}
          </Typography>
        )}
        <LinkWithStyles
          to="/registration-page"
          label="Not signed up? Register here"
        />
        <LinkWithStyles
          to="/password-recovery"
          label="Forgot password? click here"
        />
      </Dialog>
    </Box>
  );
};

export default LoginModal;
