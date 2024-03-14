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
import { exerciseBlueprintsInterface } from "../../../../interfaces/exercise.interface";
import { v4 as uuidv4 } from "uuid";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import { TablesTemplateComponent } from "../TablesTemplateComponent";
import ExerciseTypeModal from "./ExerciseTypeModal";
import {
  fetchExercises,
  updateQuery,
} from "../../../../store/slices/searchSlice";
import { SearchInput } from "../../HeaderComponent/SearchInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useSelector } from "react-redux";
import { searchFunctionalityInterface } from "../../../../interfaces/search.interface";

interface ModalWithExercisesChoiceProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseExercises: (chosenExercises: any) => void;
}

export const ModalForCreatingPeriodizedData: React.FC<
  ModalWithExercisesChoiceProps
> = ({ isOpen, onClose, onChooseExercises }) => {
  const exercises = useSelector(
    (state: { search: searchFunctionalityInterface }) => state.search.exercises
  );

  const [daysAWeek, setDaysAWeek] = useState("2");
  const [selectedDay, setSelectedDay] = useState("day1");
  const [trainingDays, setTrainingDays] = useState<any>({});
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [intensity, setIntensity] = useState<string>("");
  const [exerciseTypeModalOpen, setExerciseTypeModalOpen] =
    useState<boolean>(false);
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] =
    useState<exerciseBlueprintsInterface | null>(null);
  const [periodization, setPeriodization] = useState<string>("strength");
  const [searchingQuery, setSearchingQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(
    (state: { search: searchFunctionalityInterface }) =>
      state.search.searchQuery
  );

  useEffect(() => {
    const updatedTrainingDays: any = {};
    for (let i = 1; i <= Math.min(parseInt(daysAWeek), 3); i++) {
      updatedTrainingDays[`day${i}`] = { main: [], accessory: [] };
    }
    setTrainingDays(updatedTrainingDays);
  }, [daysAWeek]);

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
      periodization: periodization,
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
    setSets(event.target.value);
  };

  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReps(event.target.value);
  };

  const handleIntensityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIntensity(event.target.value);
  };

  const handlePeriodizationChange = (event: any) => {
    setPeriodization(event.target.value);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const rawValue = e.target.value;
    setSearchingQuery(rawValue);
  };

  const handleSearchSubmit = () => {
    dispatch({ type: updateQuery, payload: searchingQuery });
  };

  useEffect(() => {
    dispatch(fetchExercises(searchQuery));
  }, [dispatch, searchQuery]);

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
        <Grid container spacing={4}>
          <Grid item md={4}>
            <Typography variant="h6" mr={2}>
              Training Days Per Week
            </Typography>
            <Grid item sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Button
                variant="outlined"
                disabled={daysAWeek === "1"}
                sx={{
                  ...ButtonStylingForApp,
                  height: "45px",
                  width: "45px",
                  fontSize: "30px",
                  marginRight: "12px",
                }}
                onClick={() =>
                  setDaysAWeek((prev) =>
                    prev === "1" ? "1" : (parseInt(prev) - 1).toString()
                  )
                }
              >
                -
              </Button>
              <Typography variant="body1" mx={1} sx={{ fontSize: "22px" }}>
                {daysAWeek === "1" && "I"}
                {daysAWeek === "2" && "II"}
                {daysAWeek === "3" && "III"}
              </Typography>
              <Button
                variant="outlined"
                disabled={daysAWeek === "3"}
                sx={{
                  ...ButtonStylingForApp,
                  height: "45px",
                  width: "45px",
                  fontSize: "30px",
                  marginLeft: "12px",
                }}
                onClick={() =>
                  setDaysAWeek((prev) =>
                    prev === "3" ? "3" : (parseInt(prev) + 1).toString()
                  )
                }
              >
                +
              </Button>
            </Grid>
            <Grid container spacing={4}>
              <Grid item md={6} xs={10}>
                <Typography variant="h6" gutterBottom mb={0.5}>
                  Training day
                </Typography>
                <Select
                  value={selectedDay}
                  onChange={handleDaySelectionChange}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2, width: "200px", height: "30px" }}
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
              </Grid>

              <Grid item md={6} xs={10}>
                <Typography variant="h6" gutterBottom mb={0.5}>
                  Periodization
                </Typography>
                <Select
                  value={periodization}
                  onChange={handlePeriodizationChange}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 4, width: "200px", height: "30px" }}
                >
                  <MenuItem value="strength">Strength</MenuItem>
                  <MenuItem value="hypertrophy">Hypertrophy</MenuItem>
                  <MenuItem value="power">Power</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant="h6" mb={1}>
                Available Exercises
              </Typography>
              <SearchInput
                handleInputValue={handleInputValue}
                onHandleSearchSubmit={handleSearchSubmit}
                searchQuery={searchingQuery}
              />
              <Button
                onClick={() => {
                  setIsExerciseListVisible((prev) => !prev);
                }}
                sx={{ ...ButtonStylingForApp }}
              >
                {isExerciseListVisible ? "close" : "open exercise list"}
              </Button>
            </Grid>

            {isExerciseListVisible ? (
              <Grid
                container
                spacing={2}
                sx={{
                  width: "550px",
                  height: "300px",
                  overflow: "auto",
                  "@media(max-width:768px)": {
                    width: "100%",
                  },
                }}
              >
                {exercises.map((exercise) => (
                  <React.Fragment key={exercise._id}>
                    <Grid item xs={4}>
                      {" "}
                      <Typography>{exercise.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {" "}
                      <Typography>{exercise.type}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      {" "}
                      <Typography>{exercise.movementPattern}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      {" "}
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAddExercise(exercise)}
                        sx={{ ...ButtonStylingForApp, ml: 1, height: "25px" }}
                      >
                        ADD
                      </Button>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1">
                {" "}
                Expand the list to see exercises{" "}
              </Typography>
            )}
            
          </Grid>

          <Grid item md={6} sx={{ maxHeight: "400px" }}>
            <Typography variant="h6">Template</Typography>
            <Box
              sx={{
                height: "550px",
                overflow: "auto",
                margin:'5px 10px',
                "@media(max-width:768px)": {
                  height: "400px",
                  width: "100%",
                  margin: "0px 0px",
                },
              }}
            >
              {Object.keys(trainingDays).map((day) => (
                <TablesTemplateComponent
                  key={day}
                  dayLabel={day}
                  mainExercises={trainingDays[day].main}
                  accessoryExercises={trainingDays[day].accessory}
                />
              ))}
            </Box>
          </Grid>
     
        </Grid>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
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
        <ExerciseTypeModal
          open={exerciseTypeModalOpen}
          onClose={handleCloseExerciseTypeModal}
          selectedExercise={selectedExercise ? selectedExercise : null}
          sets={sets}
          reps={reps}
          intensity={intensity}
          handleSetsChange={handleSetsChange}
          handleRepsChange={handleRepsChange}
          handleIntensityChange={handleIntensityChange}
          handleSetExerciseType={handleSetExerciseType}
        />
      </Box>
    </Modal>
  );
};
