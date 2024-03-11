import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";
import { v4 as uuidv4 } from "uuid";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { TablesTemplateComponent } from "./TablesTemplateComponent";

interface ModalWithExercisesChoiceProps {
  exercises: exerciseBlueprintsInterface[];
  isOpen: boolean;
  onClose: () => void;
  onChooseExercises: (chosenExercises: any) => void;
}

export const ModalWithExercisesChoice: React.FC<
  ModalWithExercisesChoiceProps
> = ({ exercises, isOpen, onClose, onChooseExercises }) => {
  const [daysAWeek, setDaysAWeek] = useState("2");
  const [selectedDay, setSelectedDay] = useState("day1");
  const [trainingDays, setTrainingDays] = useState<any>({});

  useEffect(() => {
    const updatedTrainingDays: any = {};
    for (let i = 1; i <= Math.min(parseInt(daysAWeek), 3); i++) {
      updatedTrainingDays[`day${i}`] = { main: [], accessory: [] };
    }
    setTrainingDays(updatedTrainingDays);
  }, [daysAWeek]);

  const handleDaysAWeekChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numDays = Math.min(parseInt(event.target.value), 3).toString();
    setDaysAWeek(numDays);
    setSelectedDay("day1");
  };

  const handleDaySelectionChange = (event: any) => {
    setSelectedDay(event.target.value as string);
  };

  const handleAddExercise = (
    exercise: exerciseBlueprintsInterface,
    type: "main" | "accessory"
  ) => {
    if (!selectedDay) return;
    const newExercise = { ...exercise, _id: uuidv4() };
    setTrainingDays((prev: any) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [type]: [...prev[selectedDay][type], newExercise],
      },
    }));
  };

  const handleChooseExercises = () => {
    const chosenExercisesData = {
      timesAWeek: daysAWeek,
      trainingPlans: Object.keys(trainingDays).map((day) => ({
        day: day,
        mainExercises: trainingDays[day].main,
        accessoryExercises: trainingDays[day].accessory,
      })),
    };
    console.log(chosenExercisesData);
    onChooseExercises(chosenExercisesData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "background.paper",
          p: 4,
          overflowY: "auto",
        }}
      >
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleChooseExercises}
            sx={{ ...ButtonStylingForApp, ml: 1 }}
          >
            Choose Selected
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ ...ButtonStylingForApp, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom>
          Assign Exercises to Training Days
        </Typography>
        <TextField
          label="Days a Week"
          type="number"
          inputProps={{ min: "1", max: "3", step: "1" }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={daysAWeek}
          onChange={handleDaysAWeekChange}
          sx={{ marginBottom: 3 }}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Available Exercises</Typography>
            <Select
              value={selectedDay}
              onChange={handleDaySelectionChange}
              displayEmpty
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            >
              {Object.keys(trainingDays).map((day) => {
                // Insert a space before the number in the day string
                const dayWithSpace = day.replace(/(\d+)/, " $1");
                return (
                  <MenuItem key={day} value={day}>
                    {dayWithSpace.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
            {exercises.map((exercise) => (
              <Box
                key={exercise._id}
                sx={{ display: "flex", alignItems: "center", mt: 1 }}
              >
                <Typography sx={{ marginRight: 1, flex: 1 }}>
                  {exercise.name}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddExercise(exercise, "main")}
                >
                  Add as main exercise
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddExercise(exercise, "accessory")}
                  sx={{ ml: 1 }}
                >
                  Add as an accessory exercise
                </Button>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Training Days</Typography>
            {Object.keys(trainingDays).map((day) => (
              <TablesTemplateComponent
                dayLabel={day}
                mainExercises={trainingDays[day].main}
                accessoryExercises={trainingDays[day].accessory}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
