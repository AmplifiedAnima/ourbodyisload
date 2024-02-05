// ProfileComponent.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Link as RouterLink } from "react-router-dom";
import ChangeProfileImageModal from "./ChangeProfileImageModal";
import { updateAvatarImage } from "../../../store/slices/authSlice";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { LoginToAccessThisPartComponent } from "../LoginToAccessThisPartComponent/LoginToAccessThisPartComponent";

export const ProfileComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const { isLoggedIn, username, email, avatarImageUrl } = authState;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageSave = async (file: File) => {
    if (file) {
      try {
        await dispatch(
          updateAvatarImage({
            imageFile: file,
            authToken: authState.accessToken,
          })
        );

        handleCloseModal();
        console.log("successfull");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected");
    }
    window.location.reload();
  };

  useEffect(() => {}, [authState]);

  return (
    <>
      {isLoggedIn && username && email ? (
        <Card sx={{ height: "auto" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
              Profile
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Username: {username}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Email: {email}
            </Typography>
            <Avatar
              src={avatarImageUrl}
              alt=""
              sx={{ width: 100, height: 100, mb: 1.5 }}
            />
            <Button
              variant="outlined"
              color="primary"
              sx={ButtonStylingForApp}
              onClick={handleOpenModal}
            >
              Change Profile Image
            </Button>
            <Button
              component={RouterLink}
              to="/edit-profile-page"
              variant="outlined"
              color="primary"
              sx={ButtonStylingForApp}
            >
              Edit user data
            </Button>
          </CardContent>
          <ChangeProfileImageModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleImageSave}
          />
        </Card>
      ) : (
        <LoginToAccessThisPartComponent />
      )}
    </>
  );
};
