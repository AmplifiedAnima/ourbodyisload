import { Box, Button, Input, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";

interface UserOneRepMaxCounter {
  intensityInput: string;
  reps: string;
  handleChangeOfIntensityInput: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeOfRepsLifted: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  selectedExercise: exerciseBlueprintsInterface | null;
}

const loadTheLoad = (repetitions: number, intensity: number) => {
  const repMax: number = intensity / (1.0278 - 0.0278 * repetitions);
  return repMax;
};

const InputOneRepMaxCounter: React.FC<UserOneRepMaxCounter> = ({
  intensityInput,
  reps,
  handleChangeOfIntensityInput,
  handleChangeOfRepsLifted,
  selectedExercise,
}) => {
  const [estimatedOneRepMax, setEstimatedOneRepMax] = useState<number | null>(
    null
  );

  const handleCalculateOneRepMax = () => {
    const intensity = parseFloat(intensityInput);
    const repetitions = parseInt(reps);
    if (!isNaN(intensity) && !isNaN(repetitions)) {
      const oneRepMax = loadTheLoad(repetitions, intensity);
      setEstimatedOneRepMax(oneRepMax);
    } else {
      setEstimatedOneRepMax(null);
    }
  };

  return (
    <Box mb={2}>
      <Typography variant="body1" mb={2} sx={{ color: "purple" }}>
        Estimate 1RM MAX in{" "}
        {selectedExercise ? selectedExercise.name : "given exercise"}
      </Typography>
      <InputLabel>How much weight in kg ?</InputLabel>
      <Input
        value={intensityInput}
        inputProps={{ type: "number" }}
        onChange={handleChangeOfIntensityInput}
        fullWidth
        sx={{ mb: 2 }}
      />
      <InputLabel>How many times lifted ?</InputLabel>
      <Input
        value={reps}
        inputProps={{ type: "number" }}
        onChange={handleChangeOfRepsLifted}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box mb={2} />
      {estimatedOneRepMax !== null && (
        <Typography variant="body1">
          Estimated One Rep Max:
          <Typography sx={{ color: "purple" }}>
            {estimatedOneRepMax.toFixed(2)} kg
          </Typography>
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            ...ButtonStylingForApp,

            mb: 2,
          }}
          onClick={handleCalculateOneRepMax}
        >
          {" "}
          Count 1RM
        </Button>
      </Box>
    </Box>
  );
};

export default InputOneRepMaxCounter;
