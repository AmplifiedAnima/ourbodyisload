// ChangeProfileImageModal.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormLabel,
} from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

interface ChangeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}

const ChangeProfileImageModal: React.FC<ChangeProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
    }
  };

  const handleSave = () => {
    if (selectedImage) {
      onSave(selectedImage);
      onClose();
    } else {
      console.error("No image selected");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          "@media (max-width: 280px)": {
            width: "210px",
          },
        }}
      >
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Change Profile Image
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Input
            type="file"
            id="image-upload"
            onChange={handleImageChange}
            sx={{
              display: "none",
            }}
          />
          <FormLabel
            htmlFor="image-upload"
            sx={{
              padding: "10px",
              borderRadius:'8px',
              fontSize: "14px",
              backgroundColor: "#6a1b9a",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              letterSpacing: "1.5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                background: "green",
                color: "white",
              },
            }}
          >
            UPLOAD FILE
          </FormLabel>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{
            ...ButtonStylingForApp,
            padding: "6px",
            width: "100%",
            fontWeight: "bold",
            letterSpacing: "1.5px",
            "&:hover": {
              background: "green",
              color: "white",
            },
          }}
        >
          SAVE
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangeProfileImageModal;
