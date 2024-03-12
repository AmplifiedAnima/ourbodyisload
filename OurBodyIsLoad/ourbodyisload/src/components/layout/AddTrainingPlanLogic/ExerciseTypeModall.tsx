import React from "react";
import { Modal, Button, Typography, Box, TextField } from "@mui/material";

interface ExerciseTypeModalProps {
  open: boolean;
  onClose: () => void;
  sets: number;
  reps: number;
  intensity: number;
  handleSetsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRepsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleIntensityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetExerciseType: (type: "main" | "accessory") => void;
}

const ExerciseTypeModal: React.FC<ExerciseTypeModalProps> = ({
  open,
  onClose,
  sets,
  reps,
  intensity,
  handleSetsChange,
  handleRepsChange,
  handleIntensityChange,
  handleSetExerciseType,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "fit-content",
          maxWidth: "80vw",
          maxHeight: "80vh",
          bgcolor: "background.paper",
          p: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select whether you want it as main or accessory exercise
        </Typography>

        <TextField
          label="Sets"
          type="number"
          value={sets}
          onChange={handleSetsChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: 10 }} // Limiting sets between 1 and 10
        />
        <TextField
          label="Reps"
          type="number"
          value={reps}
          onChange={handleRepsChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: 20 }} // Limiting reps between 1 and 20
        />
        <TextField
          label="Intensity (kg)"
          type="number"
          value={intensity}
          onChange={handleIntensityChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, step: 0.5 }} // Specifying intensity in kg
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={() => handleSetExerciseType("main")}
            sx={{ mr: 1 }}
          >
            Add as main
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSetExerciseType("accessory")}
          >
            Add as accessory
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExerciseTypeModal;
