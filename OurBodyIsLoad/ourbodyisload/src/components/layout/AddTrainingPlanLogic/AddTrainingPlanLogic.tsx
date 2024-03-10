import { Box, Button, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { useState } from "react";
import { TrainingPlanInterface } from "../../../interfaces/trainingPlan.interface";
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";

export const AddTrainingPlanLogic = () => {
  const [training, savedTraining] = useState<TrainingPlanInterface | null>();

  const mockData = {
    mainExercisesPart: [
      {
        name: "Squat",
        sets: "5",
        reps: "5",
        intensity: "High",
        movementPattern: "Compound",
        plane: "Sagittal",
        type: "Strength",
      },
    ],
    accesoryExercises: [
      {
        name: "Leg Press",
        sets: "3",
        reps: "10",
        intensity: "Medium",
        movementPattern: "Compound",
        plane: "Sagittal",
        type: "Hypertrophy",
      },
      {
        name: "Leg Curl",
        sets: "3",
        reps: "12",
        intensity: "Medium",
        movementPattern: "Isolation",
        plane: "Sagittal",
        type: "Hypertrophy",
      },
      {
        name: "Calf Raise",
        sets: "4",
        reps: "15",
        intensity: "Low",
        movementPattern: "Isolation",
        plane: "Sagittal",
        type: "Endurance",
      },
    ],
  };
  const fetchData = async (userData: any) => {
    try {
      const response = await fetch(`http://localhost:3000/training-plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        savedTraining(data);
        console.log(data);
      } else {
        console.log(`error fetching `);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTrainingPlan = () => {
    fetchData(mockData);
  };

  return (
    <>
      <Button onClick={handleCreateTrainingPlan} sx={ButtonStylingForApp}>
        add Data
      </Button>
      {training && (
        <Box>
          <Typography variant="h6">Main Exercises</Typography>
          {training.mainExercisesPart.map((exercise: exerciseBlueprintsInterface) => (
            <Box key={exercise._id}>
              <Typography>Name: {exercise.name}</Typography>
              <Typography>Sets: {exercise.sets}</Typography>
              <Typography>Reps: {exercise.reps}</Typography>
              <Typography>Intensity: {exercise.intensity}</Typography>
            </Box>
          ))}
          <Typography variant="h6">Accessory Exercises</Typography>
          {training.accesoryExercises.map((exercise: exerciseBlueprintsInterface) => (
            <Box key={exercise._id}>
              <Typography>Name: {exercise.name}</Typography>
              <Typography>Sets: {exercise.sets}</Typography>
              <Typography>Reps: {exercise.reps}</Typography>
              <Typography>Intensity: {exercise.intensity}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
