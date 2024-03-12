import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Typography,
  Box,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";
import { v4 as uuidv4 } from "uuid";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { TablesTemplateComponent } from "./TablesTemplateComponent";
import ExerciseTypeModal from "./ExerciseTypeModall";

interface ModalWithExercisesChoiceProps {
  exercises: exerciseBlueprintsInterface[];
  isOpen: boolean;
  onClose: () => void;
  onChooseExercises: (chosenExercises: any) => void;
}

export const ModalForCreatingPeriodizedData: React.FC<
  ModalWithExercisesChoiceProps
> = ({ exercises, isOpen, onClose, onChooseExercises }) => {
  const [daysAWeek, setDaysAWeek] = useState("2");
  const [selectedDay, setSelectedDay] = useState("day1");
  const [trainingDays, setTrainingDays] = useState<any>({});
  const [reps, setReps] = useState<any>();
  const [sets, setSets] = useState<any>();
  const [intensity, setIntensity] = useState<any>();
  const [exerciseTypeModalOpen, setExerciseTypeModalOpen] =
    useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] =
    useState<exerciseBlueprintsInterface | null>(null);
  const [periodization, setPeriodization] = useState<string>("strength");

  useEffect(() => {
    const updatedTrainingDays: any = {};
    for (let i = 1; i <= Math.min(parseInt(daysAWeek), 3); i++) {
      updatedTrainingDays[`day${i}`] = { main: [], accessory: [] };
    }
    setTrainingDays(updatedTrainingDays);
  }, [daysAWeek]);

  const handleDaysAWeekChange = (event: any) => {
    const numDays = Math.min(parseInt(event.target.value), 3).toString();
    setDaysAWeek(numDays);
    setSelectedDay("day1");
  };

  const handleDaySelectionChange = (event: any) => {
    setSelectedDay(event.target.value as string);
  };

  const handleAddExercise = (exercise: exerciseBlueprintsInterface) => {
    setSelectedExercise(exercise);
    setExerciseTypeModalOpen(true);
  };

  const handleChooseExercises = () => {
    const chosenExercisesData = {
      timesAWeek: daysAWeek,
      trainingPlans: Object.keys(trainingDays).map((day) => ({
        day: day,
        mainExercises: trainingDays[day].main,
        accessoryExercises: trainingDays[day].accessory,
      })),
      periodization: periodization, // Include periodization here
    };
    console.log(chosenExercisesData);
    onChooseExercises(chosenExercisesData);
    onClose();
  };

  const handleCloseExerciseTypeModal = () => {
    setSelectedExercise(null);
    setExerciseTypeModalOpen(false);
  };
  const handleSetExerciseType = (type: "main" | "accessory") => {
    if (!selectedDay || !selectedExercise) return;
    const newExercise = {
      ...selectedExercise,
      _id: uuidv4(),
      sets: sets,
      reps: reps,
      intensity: intensity,
    };
    setTrainingDays((prev: any) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [type]: [...prev[selectedDay][type], newExercise],
      },
    }));
    setSelectedExercise(null);
    setExerciseTypeModalOpen(false);
  };
  const handleSetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSets(parseInt(event.target.value));
  };

  // Event handler to update reps
  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReps(parseInt(event.target.value));
  };

  // Event handler to update intensity
  const handleIntensityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIntensity(parseInt(event.target.value));
  };
  const handlePeriodizationChange = (event: any) => {
    setPeriodization(event.target.value);
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
        <Box sx={{width: '100%'}}>
          <Typography variant="h6" gutterBottom>
            {" "}
            Select how many days a week you will be training
          </Typography>
          <Select
            label="Days a Week"
            value={daysAWeek}
            onChange={handleDaysAWeekChange}
            displayEmpty
            fullWidth
            variant="outlined"
            sx={{ mb: 2, width: "auto" }}
          >
            <MenuItem value="2">2 days</MenuItem>
            <MenuItem value="3">3 days</MenuItem>
          </Select>
          <Typography variant="h6" gutterBottom>
            {" "}
            Select what is motor skill is your goal
          </Typography>
          <Select
            value={periodization}
            onChange={handlePeriodizationChange}
            displayEmpty
            fullWidth
            variant="outlined"
            sx={{ mb: 2, width: "auto" }}
          >
            <MenuItem value="strength">Strength</MenuItem>
            <MenuItem value="hypertrophy">Hypertrophy</MenuItem>
            <MenuItem value="power">Power</MenuItem>
          </Select>
          <Typography variant="h6" gutterBottom>
            Assign Exercises to Training Days
          </Typography>

          <Grid container spacing={4}>
            <Grid item md={6}>
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
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    width: "auto",
                  }}
                >
                  <Typography sx={{ marginRight: 2 }}>
                    {exercise.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddExercise(exercise)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Add
                  </Button>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Training Days</Typography>
              {Object.keys(trainingDays).map((day) => (
                <TablesTemplateComponent
                  key={day}
                  dayLabel={day}
                  mainExercises={trainingDays[day].main}
                  accessoryExercises={trainingDays[day].accessory}
                />
              ))}
            </Grid>
          </Grid>
          <ExerciseTypeModal
            open={exerciseTypeModalOpen}
            onClose={handleCloseExerciseTypeModal}
            sets={sets}
            reps={reps}
            intensity={intensity}
            handleSetsChange={handleSetsChange}
            handleRepsChange={handleRepsChange}
            handleIntensityChange={handleIntensityChange}
            handleSetExerciseType={handleSetExerciseType}
          />
        </Box>
      </Box>
    </Modal>
  );
};
