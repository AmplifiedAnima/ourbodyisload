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
import { signIn } from "../../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { Link } from "react-router-dom";
import { SimpleErrorInlineHandler } from "../ErrorAndNotificationHandlers/ErrorHandlerDisplayComponent";
import {
  closeButtonStyles,
  inputStylingSx,
  linkWithStylesSx,
  loginButtonStyles,
} from "./loginModalStyles";
import { ImageOfLoginArrow } from "../HeaderComponent/MenuDashboard/ImagesExported";

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
        }}
      >
        <Typography sx={linkWithStylesSx}>{label}</Typography>
      </Link>
    );
  };
  return (
    <Box>
      <Button onClick={handleOpen} sx={{margin:'2px'}}>
        {ImageOfLoginArrow}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ background: "rgba(94, 0, 140, 0.3)", zIndex: 10000 }}
      >
        <DialogContent sx={{ border: "3px solid rgba(94, 0, 140, 0.8)" }}>
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

          <DialogActions>
            <Button onClick={handleClose} sx={closeButtonStyles}>
              Cancel
            </Button>

            <Button onClick={handleLogin} sx={loginButtonStyles}>
              Login
            </Button>
          </DialogActions>
          {errorLogin && (
            <SimpleErrorInlineHandler
              error={errorLogin}
              handleCloseError={() => setErrorLogin("")}
            />
          )}
          <LinkWithStyles
            to="/registration-page"
            label="Not signed up? Register here"
          />
          <LinkWithStyles
            to="/password-recovery"
            label="Forgot password? Click here"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LoginModal;
